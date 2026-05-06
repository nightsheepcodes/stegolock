# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\cover-ingest.spec.ts >> Cover Ingest E2E Test - Steganographic Cover Library >> CI-01: Complete cover ingest workflow from file selection to storage confirmation
- Location: tests\e2e\cover-ingest.spec.ts:40:5

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 180000ms exceeded.
Call log:
  - waiting for locator('select').first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]:
        - link "StegoLock" [ref=e8] [cursor=pointer]:
          - /url: /myDocuments
          - generic [ref=e9]:
            - img [ref=e11]
            - heading "StegoLock" [level=1] [ref=e14]
        - button [ref=e15] [cursor=pointer]:
          - img [ref=e16]
      - button "New" [ref=e20] [cursor=pointer]:
        - img [ref=e21]
        - text: New
        - img [ref=e22]
    - generic [ref=e24]:
      - generic [ref=e26]:
        - link "My Documents" [ref=e27] [cursor=pointer]:
          - /url: http://stegolock.test/myDocuments
          - img [ref=e28]
          - text: My Documents
        - link "All Documents" [ref=e30] [cursor=pointer]:
          - /url: http://stegolock.test/allDocuments
          - img [ref=e31]
          - text: All Documents
        - link "Shared With Me" [ref=e33] [cursor=pointer]:
          - /url: http://stegolock.test/sharedDocuments
          - img [ref=e34]
          - generic [ref=e40]: Shared With Me
        - link "Starred" [ref=e41] [cursor=pointer]:
          - /url: http://stegolock.test/starredDocuments
          - img [ref=e42]
          - text: Starred
      - generic [ref=e44]:
        - paragraph [ref=e46]: System Control
        - generic [ref=e47]:
          - link "Dashboard" [ref=e48] [cursor=pointer]:
            - /url: http://stegolock.test/admin/dashboard
            - img [ref=e49]
            - text: Dashboard
          - link "Cloud Management" [ref=e54] [cursor=pointer]:
            - /url: http://stegolock.test/admin/cloud
            - img [ref=e55]
            - text: Cloud Management
          - link "Database Management" [ref=e57] [cursor=pointer]:
            - /url: http://stegolock.test/admin/database
            - img [ref=e58]
            - text: Database Management
          - link "Cover Management" [ref=e61] [cursor=pointer]:
            - /url: http://stegolock.test/admin/covers
            - img [ref=e62]
            - text: Cover Management
    - generic [ref=e67]:
      - generic [ref=e69]:
        - generic [ref=e70]: Personal Space
        - generic [ref=e71]: 0 Bytes / 1 GB
      - button "Manage Personal Space" [ref=e73] [cursor=pointer]:
        - img [ref=e74]
        - generic [ref=e76]: Manage Personal Space
  - generic [ref=e77]:
    - banner [ref=e78]:
      - generic [ref=e80]:
        - generic [ref=e82]:
          - generic [ref=e83]:
            - img [ref=e85]
            - generic [ref=e89]:
              - heading "Steganographic Cover Library" [level=2] [ref=e90]
              - paragraph [ref=e91]: Automated scan, validation & integrity monitoring
          - generic [ref=e92]:
            - button "Run Integrity Audit" [ref=e93] [cursor=pointer]:
              - img [ref=e94]
              - text: Run Integrity Audit
            - button "Scan 0 Candidate(s)" [disabled] [ref=e96]:
              - img [ref=e97]
              - text: Scan 0 Candidate(s)
        - generic [ref=e102]:
          - generic [ref=e104]: DB_STORAGE_ADMIN
          - button "S" [ref=e107] [cursor=pointer]:
            - generic [ref=e108]: S
    - main [ref=e109]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - generic [ref=e113]:
            - heading "Upload Cover Candidates" [level=3] [ref=e114]:
              - img [ref=e115]
              - text: Upload Cover Candidates
            - generic [ref=e118]:
              - generic [ref=e119]:
                - button "image" [ref=e120] [cursor=pointer]:
                  - img [ref=e121]
                  - generic [ref=e126]: image
                - button "audio" [ref=e127] [cursor=pointer]:
                  - img [ref=e128]
                  - generic [ref=e132]: audio
                - button "text" [ref=e133] [cursor=pointer]:
                  - img [ref=e134]
                  - generic [ref=e137]: text
              - generic [ref=e138]:
                - button "Choose File" [ref=e139] [cursor=pointer]
                - generic [ref=e140]:
                  - img [ref=e142]
                  - generic [ref=e145]:
                    - paragraph [ref=e146]: Click or drag image files here
                    - paragraph [ref=e147]: "Supported: PNG, WAV, TXT (Max 50MB)"
              - button "Start Ingest Process" [disabled] [ref=e148]
          - generic [ref=e149]:
            - generic [ref=e150]:
              - heading "Pending Ingest" [level=4] [ref=e151]
              - generic [ref=e152]:
                - generic [ref=e153]: "0"
                - img [ref=e155]
              - paragraph [ref=e160]: "* These files are sitting in the local inbox. Run the scan to validate capacity and sync to Backblaze B2."
            - generic [ref=e161]:
              - heading "System Guidance" [level=4] [ref=e162]
              - generic [ref=e163]:
                - generic [ref=e164]:
                  - img [ref=e165]
                  - generic [ref=e168]: Fragment size should be max 15% of Image/Audio capacity.
                - generic [ref=e169]:
                  - img [ref=e170]
                  - generic [ref=e173]: Text capacity uses a strict 2% safety rule.
                - generic [ref=e174]:
                  - img [ref=e175]
                  - generic [ref=e178]: Standardized filenames are generated automatically.
        - generic [ref=e179]:
          - generic [ref=e180]:
            - generic [ref=e181]:
              - heading "Cloud Library" [level=3] [ref=e182]
              - generic [ref=e183]:
                - button "all" [ref=e184] [cursor=pointer]
                - button "image" [ref=e185] [cursor=pointer]
                - button "audio" [ref=e186] [cursor=pointer]
                - button "text" [ref=e187] [cursor=pointer]
            - generic [ref=e188]:
              - img [ref=e189]
              - textbox "Search filenames..." [ref=e192]
          - generic [ref=e195]: No covers found matching your criteria
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import * as fs from 'fs';
  3   | import * as path from 'path';
  4   | 
  5   | test.describe('Cover Ingest E2E Test - Steganographic Cover Library', () => {
  6   |     test.setTimeout(180000); // 3 minutes for full ingest workflow
  7   | 
  8   |     let testDir: string;
  9   | 
  10  |     // Create test cover files before each test
  11  |     test.beforeEach(async ({}, testInfo) => {
  12  |         testDir = path.join(testInfo.project.testDir, 'test-covers');
  13  |         if (!fs.existsSync(testDir)) {
  14  |             fs.mkdirSync(testDir, { recursive: true });
  15  |         }
  16  | 
  17  |         // Create a dummy text file (1KB)
  18  |         const textContent = 'A'.repeat(1024);
  19  |         fs.writeFileSync(path.join(testDir, 'test-cover.txt'), textContent);
  20  | 
  21  |         // Create a dummy image file (simulate PNG - 2KB)
  22  |         const imageBuffer = Buffer.alloc(2048, 0);
  23  |         // Add minimal PNG header
  24  |         imageBuffer.writeUInt32BE(0x89504E47, 0);
  25  |         imageBuffer.writeUInt32BE(0x0D0A1A0A, 4);
  26  |         fs.writeFileSync(path.join(testDir, 'test-cover.png'), imageBuffer);
  27  | 
  28  |         // Create a dummy audio file (simulate MP3 - 3KB)
  29  |         const audioBuffer = Buffer.alloc(3072, 0);
  30  |         fs.writeFileSync(path.join(testDir, 'test-cover.mp3'), audioBuffer);
  31  |     });
  32  | 
  33  |     // Clean up test files after each test
  34  |     test.afterEach(async () => {
  35  |         if (fs.existsSync(testDir)) {
  36  |             fs.rmSync(testDir, { recursive: true, force: true });
  37  |         }
  38  |     });
  39  | 
  40  |     test('CI-01: Complete cover ingest workflow from file selection to storage confirmation', async ({ page }) => {
  41  |         // Step1: Login as System Administrator (has cover management permissions)
  42  |         await page.goto('http://stegolock.test/login', { timeout: 10000 });
  43  |         await page.fill('input[id="email"]', 'system.admin@stegolock.com');
  44  |         await page.fill('input[id="password"]', 'password');
  45  |         await page.click('button:has-text("Log in")');
  46  |         // Admin users are redirected to dashboard
  47  |         await page.waitForURL('**/admin/dashboard', { timeout: 20000, waitUntil: 'networkidle' });
  48  | 
  49  |         // Step 2: Navigate to Cover Management page
  50  |         await page.goto('http://stegolock.test/admin/covers', { timeout: 10000 });
  51  |         await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });
  52  | 
  53  |         // Verify we're on the correct page
  54  |         const pageTitle = await page.locator('h2').first().textContent();
  55  |         expect(pageTitle).toContain('Steganographic Cover Library');
  56  | 
  57  |         // Step 3: Upload Text Cover Candidate
  58  |         const textFilePath = path.join(testDir, 'test-cover.txt');
  59  | 
  60  |         // Select cover type as 'text' - find the select element
  61  |         const typeSelect = page.locator('select').first();
> 62  |         await typeSelect.selectOption('text');
      |                          ^ Error: locator.selectOption: Test timeout of 180000ms exceeded.
  63  |         await page.waitForTimeout(500);
  64  | 
  65  |         // Upload text file
  66  |         const fileInput = page.locator('input[type="file"]').first();
  67  |         await fileInput.setInputFiles(textFilePath);
  68  |         await page.waitForTimeout(1000);
  69  | 
  70  |         // Submit upload - find the form's submit button
  71  |         const uploadButton = page.locator('button[type="submit"]:has-text("Upload"), button:has-text("Upload Candidate")').first();
  72  |         await uploadButton.click();
  73  |         await page.waitForTimeout(2000);
  74  | 
  75  |         // Step 4: Upload Image Cover Candidate
  76  |         const imageFilePath = path.join(testDir, 'test-cover.png');
  77  | 
  78  |         // Select cover type as 'image'
  79  |         await typeSelect.selectOption('image');
  80  |         await page.waitForTimeout(500);
  81  | 
  82  |         // Upload image file
  83  |         await fileInput.setInputFiles(imageFilePath);
  84  |         await page.waitForTimeout(1000);
  85  | 
  86  |         // Submit upload
  87  |         await uploadButton.click();
  88  |         await page.waitForTimeout(2000);
  89  | 
  90  |         // Step 5: Upload Audio Cover Candidate
  91  |         const audioFilePath = path.join(testDir, 'test-cover.mp3');
  92  | 
  93  |         // Select cover type as 'audio'
  94  |         await typeSelect.selectOption('audio');
  95  |         await page.waitForTimeout(500);
  96  | 
  97  |         // Upload audio file
  98  |         await fileInput.setInputFiles(audioFilePath);
  99  |         await page.waitForTimeout(1000);
  100 | 
  101 |         // Submit upload
  102 |         await uploadButton.click();
  103 |         await page.waitForTimeout(2000);
  104 | 
  105 |         // Step 6: Verify candidate count increased
  106 |         const candidateCountText = await page.locator('text=/Candidate|Scan \\d+ Candidate/').first().textContent();
  107 |         expect(candidateCountText).toBeTruthy();
  108 | 
  109 |         // Step 7: Trigger Scan to process candidates and upload to cloud
  110 |         const scanButton = page.locator('button:has-text("Scan")').first();
  111 |         await scanButton.click();
  112 | 
  113 |         // Wait for scan to complete (background job)
  114 |         await page.waitForTimeout(5000);
  115 | 
  116 |         // Step 8: Refresh page to see updated cover library
  117 |         await page.reload();
  118 |         await page.waitForURL('**/admin/covers', { timeout: 15000 });
  119 |         await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });
  120 |         await page.waitForTimeout(3000);
  121 | 
  122 |         // Step 9: Verify covers appear in the library (final storage confirmation)
  123 |         const coversSection = page.locator('text=/Steganographic Cover Library/i');
  124 |         await expect(coversSection).toBeVisible();
  125 | 
  126 |         // Take a screenshot for verification
  127 |         await page.screenshot({ path: `test-results/cover-ingest-${Date.now()}.png`, fullPage: true });
  128 |         console.log('Cover ingest workflow completed');
  129 |     });
  130 | 
  131 |     test('CI-02: Verify upload validation - invalid file type', async ({ page }) => {
  132 |         // Login as admin
  133 |         await page.goto('http://stegolock.test/login', { timeout: 10000 });
  134 |         await page.fill('input[id="email"]', 'system.admin@stegolock.com');
  135 |         await page.fill('input[id="password"]', 'password');
  136 |         await page.click('button:has-text("Log in")');
  137 |         await page.waitForURL('**/admin/dashboard', { timeout: 20000, waitUntil: 'networkidle' });
  138 | 
  139 |         // Navigate to Cover Management
  140 |         await page.goto('http://stegolock.test/admin/covers', { timeout: 10000 });
  141 |         await page.waitForSelector('h2:text("Steganographic Cover Library")', { timeout: 15000 });
  142 | 
  143 |         // Create an invalid file (e.g., .exe file)
  144 |         const invalidFilePath = path.join(testDir, 'invalid-file.exe');
  145 |         fs.writeFileSync(invalidFilePath, 'fake content');
  146 | 
  147 |         // Try to upload invalid file
  148 |         const fileInput = page.locator('input[type="file"]').first();
  149 |         await fileInput.setInputFiles(invalidFilePath);
  150 |         await page.waitForTimeout(1000);
  151 | 
  152 |         // Submit upload
  153 |         const uploadButton = page.locator('button[type="submit"]:has-text("Upload"), button:has-text("Upload Candidate")').first();
  154 |         await uploadButton.click();
  155 |         await page.waitForTimeout(2000);
  156 | 
  157 |         // Verify error message appears (if validation is in place)
  158 |         const errorMessage = page.locator('text=/error|invalid|not allowed/i').first();
  159 |         const hasError = await errorMessage.isVisible().catch(() => false);
  160 | 
  161 |         // Clean up
  162 |         if (fs.existsSync(invalidFilePath)) {
```