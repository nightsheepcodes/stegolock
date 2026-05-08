# StegoLock Guided Evaluation Tour

This guided tour is designed to walk evaluators through the core features of the StegoLock application. By following these steps, users will interact with all the necessary components to accurately answer the evaluation survey based on the 5 ISO 25010 characteristics: **Functional Sustainability (FS)**, **Reliability (RE)**, **Security (SC)**, **Performance Efficiency (PE)**, and **Usability (US)**.

> [!NOTE]
> Evaluators should be encouraged to pay attention to load times, visual feedback (like loading spinners), error messages, and the overall "feel" of the application during this tour.

---

## Phase 1: Onboarding & Access Control
*Primary Characteristics Evaluated: Security (SC), Usability (US)*

1. **Registration:** Navigate to the registration page. Create a new account with a valid email and strong password.
2. **Authentication Check:** Log out of the newly created account, and then log back in.
3. **Unauthorized Access Test:** Copy the URL of the main dashboard. Log out, paste the URL back into the browser, and attempt to access it without being logged in. (You should be redirected to the login page).

**What to observe:** 
- How easy is it to create an account and log in? (US)
- Does the system effectively prevent unauthorized access to the dashboard? (SC)
- Do you feel the authentication mechanism is strong and trustworthy? (SC)

## Phase 2: Navigation & Interface Exploration
*Primary Characteristics Evaluated: Usability (US), Functional Sustainability (FS), Reliability (RE)*

1. **Dashboard Overview:** Look around the main dashboard. Identify where your documents, profile settings, and shared files are located.
2. **Device Testing (If possible):** Resize your browser window to simulate a tablet/mobile phone, or physically log in using your smartphone. 
3. **Menu Traversal:** Click through every main navigation link (e.g., Dashboard, My Documents, Profile) to see how the pages load.

**What to observe:**
- Is the interface attractive, well-organized, and user-friendly? (US)
- Do all the navigation buttons work as expected? (FS)
- Does the app adapt well and remain usable on different screen sizes/devices? (RE, US)

## Phase 3: Core Operation - Locking a Document
*Primary Characteristics Evaluated: Performance Efficiency (PE), Reliability (RE), Functional Sustainability (FS)*

1. **Upload Process:** Navigate to the document upload/lock section. Select a sample file (e.g., an image or PDF) from your device.
2. **Locking Execution:** Submit the file to be locked using StegoLock's steganographic process. 
3. **Observation:** Carefully watch the screen during the upload and locking process. 

**What to observe:**
- Does the application respond quickly when you click the "Upload/Lock" button? (PE)
- Is there any noticeable lag, or does the app crash during this heavy processing task? (RE, PE)
- Does the app provide adequate feedback (spinners, success messages) so you know what is happening? (FS)

## Phase 4: Document Management & Sharing
*Primary Characteristics Evaluated: Security (SC), Functional Sustainability (FS), Performance Efficiency (PE)*

1. **Viewing Data:** Go to your document repository. Click on the document you just locked to view its details.
2. **Sharing Process:** Use the application's sharing feature to grant access to another specific user (you may need to create a second dummy account or use a provided test email).
3. **Data Control:** Verify that the sharing settings clearly indicate who has access.

**What to observe:**
- Do you feel you have good control over your data and who can see it? (SC)
- Is the information provided about your documents comprehensive and adequate? (FS)
- Are there any delays when loading the document details or executing the share command? (PE)

## Phase 5: Updating Information
*Primary Characteristics Evaluated: Performance Efficiency (PE), Usability (US)*

1. **Profile Editing:** Navigate to the Profile or Account Settings page.
2. **Data Modification:** Change a piece of information, such as your display name or a preference setting, and save the changes.

**What to observe:**
- How quickly does the app respond and confirm that your profile was updated? (PE)
- Is the process of updating your data straightforward and easy to understand? (US)

## Phase 6: Resilience Testing (Optional but Recommended)
*Primary Characteristics Evaluated: Reliability (RE)*

1. **Connection Fluctuation:** If using a mobile device, try switching from WiFi to Cellular Data while navigating the app, or simulate a slow network using browser developer tools.
2. **Error Handling:** Try to intentionally cause a minor error, such as submitting a form with missing required fields or uploading an unsupported file type.

**What to observe:**
- How does the application perform on different network connections? (RE)
- If an error occurs (like an invalid file upload), does the app handle it gracefully without crashing, allowing you to continue using it normally? (RE)

---

## Conclusion of Tour

After completing these steps, the user will have touched upon all the critical paths necessary to provide informed, accurate responses to the 31 questions across the 5 ISO 25010 categories in the evaluation survey.
