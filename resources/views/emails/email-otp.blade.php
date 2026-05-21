<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your StegoLock Account</title>
    <style>
        body {
            background-color: #0b0f19;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #e2e8f0;
            margin: 0;
            padding: 0;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #0b0f19;
            padding: 40px 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #111827;
            border: 1px solid #1f2937;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 0.05em;
        }
        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #f8fafc;
        }
        .text {
            color: #94a3b8;
            font-size: 15px;
            margin-bottom: 30px;
        }
        .otp-container {
            background-color: #1f2937;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            margin-bottom: 30px;
        }
        .otp-code {
            font-family: "Courier New", Courier, monospace;
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 0.25em;
            color: #38bdf8;
            margin: 0;
        }
        .warning-box {
            background-color: rgba(245, 158, 11, 0.1);
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
            padding: 12px 16px;
            margin-bottom: 30px;
            color: #f59e0b;
            font-size: 14px;
        }
        .footer {
            background-color: #0b0f19;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #1f2937;
        }
        .footer-text {
            color: #4b5563;
            font-size: 12px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>STEGOLOCK</h1>
            </div>
            <div class="content">
                <div class="greeting">Hi {{ $user->name }},</div>
                <div class="text">
                    Thank you for creating an account with <strong>StegoLock</strong>. To complete your registration and activate your secure cryptographic vault, please verify your email address by entering the following 6-digit One-Time Password (OTP) code in the verification screen:
                </div>
                <div class="otp-container">
                    <div class="otp-code">{{ $code }}</div>
                </div>
                <div class="warning-box">
                    <strong>Notice:</strong> This verification code is extremely time-sensitive and will expire in <strong>5 minutes</strong>. If the code expires, you can request a new one from the verification screen.
                </div>
                <div class="text">
                    If you did not register for a StegoLock account, you can safely ignore this email.
                </div>
            </div>
            <div class="footer">
                <p class="footer-text">&copy; {{ date('Y') }} StegoLock. All rights reserved.</p>
                <p class="footer-text" style="margin-top: 8px;">Zero-Knowledge Cryptographic Document Steganography Vault</p>
            </div>
        </div>
    </div>
</body>
</html>
