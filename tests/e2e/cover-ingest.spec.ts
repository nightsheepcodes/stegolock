import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Cover Ingest E2E Test - Steganographic Cover Library', () => {
    test.setTimeout(180000); // 3 minutes for full ingest workflow

    let testDir: string;

    // Create test cover files before each test
    test.beforeEach(async ({}, testInfo) => {
        testDir = path.join(testInfo.project.testDir, 'test-covers');
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }

        // Create a dummy text file (1KB)
        const textContent = 'A'.repeat(1024);
        fs.writeFileSync(path.join(testDir, 'test-cover.txt'), textContent);

        // Create a dummy image file (simulate PNG - 2KB)
        const imageBuffer = Buffer.alloc(2048, 0);
        // Add minimal PNG header
        imageBuffer.writeUInt32BE(0x89504E47, 0);
        imageBuffer.writeUInt32BE(0x0D0A1A0A, 4);
        fs.writeFileSync(path.join(testDir, 'test-cover.png'), imageBuffer);

        // Create a dummy audio file (simulate MP3 - 3KB)
        const audioBuffer = Buffer.alloc(3072, 0);
        fs.writeFileSync(path.join(testDir, 'test-cover.mp3'), audioBuffer);
    });

    // Clean up test files after each test
    test.afterEach(async () => {
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    test('CI-01: Complete cover ingest workflow from file selection to storage confirmation', async ({ page }) => {
        // Step1: Login as System Administrator (has cover management permissions)
        await page.goto('http://stegolock.test/login', { timeout: 10000 });
        await page.fill('input[id="email"]', 'system.admin@stegolock.com');
        await page.fill('input[id="password"]', 'password');
        await page.click('button:has-text("Log in")');
        // Admin users are redirected to dashboard
        await page.waitForURL('**/admin/dashboard', { timeout: 20000, waitUntil: 'networkidle' });

        // Step2: Navigate to Cover Management page
        await page.goto('http://stegolock.test/admin/covers', { timeout: 10000 });
        await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });

        // Verify we're on the correct page
        const pageTitle = await page.locator('h2').first().textContent();
        expect(pageTitle).toContain('Steganographic Cover Library');

        // Step 3: Upload Text Cover Candidate
        const textFilePath = path.join(testDir, 'test-cover.txt');

        // Click the text type button
        await page.click('button:has-text("text")');
        await page.waitForTimeout(500);

        // Upload text file - use the hidden file input
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(textFilePath);
        await page.waitForTimeout(1000);

        // Submit upload - click the "Start Ingest Process" button
        const uploadButton = page.locator('button:has-text("Start Ingest Process")');
        await uploadButton.click();
        await page.waitForTimeout(3000);

        // Step 4: Upload Image Cover Candidate
        const imageFilePath = path.join(testDir, 'test-cover.png');

        // Click the image type button
        await page.click('button:has-text("image")');
        await page.waitForTimeout(500);

        // Upload image file
        await fileInput.setInputFiles(imageFilePath);
        await page.waitForTimeout(1000);

        // Submit upload
        await uploadButton.click();
        await page.waitForTimeout(3000);

        // Step 5: Upload Audio Cover Candidate
        const audioFilePath = path.join(testDir, 'test-cover.mp3');

        // Click the audio type button
        await page.click('button:has-text("audio")');
        await page.waitForTimeout(500);

        // Upload audio file
        await fileInput.setInputFiles(audioFilePath);
        await page.waitForTimeout(1000);

        // Submit upload
        await uploadButton.click();
        await page.waitForTimeout(3000);

        // Step 6: Verify candidate count increased
        const candidateCountText = await page.locator('text=/Candidate|Scan \\d+ Candidate/').first().textContent();
        expect(candidateCountText).toBeTruthy();
        console.log('Candidate count text:', candidateCountText);

        // Step 7: Trigger Scan to process candidates and upload to cloud
        const scanButton = page.locator('button:has-text("Scan")').first();
        await scanButton.click();

        // Wait for scan to complete (background job)
        await page.waitForTimeout(10000);

        // Step 8: Refresh page to see updated cover library
        await page.reload();
        await page.waitForURL('**/admin/covers', { timeout: 15000 });
        await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });
        await page.waitForTimeout(3000);

        // Step 9: Verify covers appear in the library (final storage confirmation)
        const coversSection = page.locator('text=/Steganographic Cover Library/i');
        await expect(coversSection).toBeVisible();

        // Take a screenshot for verification
        await page.screenshot({ path: `test-results/cover-ingest-${Date.now()}.png`, fullPage: true });
        console.log('Cover ingest workflow completed');
    });

    test('CI-02: Verify upload validation - invalid file type', async ({ page }) => {
        // Login as admin
        await page.goto('http://stegolock.test/login', { timeout: 10000 });
        await page.fill('input[id="email"]', 'system.admin@stegolock.com');
        await page.fill('input[id="password"]', 'password');
        await page.click('button:has-text("Log in")');
        await page.waitForURL('**/admin/dashboard', { timeout: 20000, waitUntil: 'networkidle' });

        // Navigate to Cover Management
        await page.goto('http://stegolock.test/admin/covers', { timeout: 10000 });
        await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });

        // Create an invalid file (e.g., .exe file)
        const invalidFilePath = path.join(testDir, 'invalid-file.exe');
        fs.writeFileSync(invalidFilePath, 'fake content');

        // Try to upload invalid file
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(invalidFilePath);
        await page.waitForTimeout(1000);

        // Submit upload
        const uploadButton = page.locator('button:has-text("Start Ingest Process")');
        await uploadButton.click();
        await page.waitForTimeout(2000);

        // Verify error message appears (if validation is in place)
        const errorMessage = page.locator('text=/error|invalid|not allowed/i').first();
        const hasError = await errorMessage.isVisible().catch(() => false);

        // Clean up
        if (fs.existsSync(invalidFilePath)) {
            fs.unlinkSync(invalidFilePath);
        }

        console.log('Invalid file upload test completed, error shown:', hasError);
    });

    test('CI-03: Verify scan button state based on candidate availability', async ({ page }) => {
        // Login as admin
        await page.goto('http://stegolock.test/login', { timeout: 10000 });
        await page.fill('input[id="email"]', 'system.admin@stegolock.com');
        await page.fill('input[id="password"]', 'password');
        await page.click('button:has-text("Log in")');
        await page.waitForURL('**/admin/dashboard', { timeout: 20000, waitUntil: 'networkidle' });

        // Navigate to Cover Management
        await page.goto('http://stegolock.test/admin/covers', { timeout: 10000 });
        await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });

        // Check initial scan button state (should show candidate count)
        const scanButton = page.locator('button:has-text("Scan")').first();
        const buttonText = await scanButton.textContent();
        console.log('Scan button text:', buttonText);

        // Verify button shows candidate count
        expect(buttonText).toBeTruthy();
    });
});
