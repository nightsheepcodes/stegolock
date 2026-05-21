<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authorize Your StegoLock Login</title>
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
            background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
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
            background-color: rgba(239, 68, 68, 0.1);
            border-left: 4px solid #ef4444;
            border-radius: 4px;
            padding: 12px 16px;
            margin-bottom: 30px;
            color: #f87171;
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
                <div class="greeting">Hello {{ $user->name }},</div>
                <div class="text">
                    A login attempt was made to access your <strong>StegoLock</strong> vault. To verify your identity and authorize this session, please enter the following 6-digit Two-Factor Authentication (2FA) code in the login verification screen:
                </div>
                <div class="otp-container">
                    <div class="otp-code">{{ $code }}</div>
                </div>
                <div class="warning-box">
                    <strong>Critical Notice:</strong> This authorization code will expire in <strong>5 minutes</strong>. If you did not initiate this login request, your password may be compromised. Please secure your account immediately.
                </div>
                <div class="text">
                    This security layer is active because you enabled Email Two-Factor Authentication in your StegoLock profile settings.
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
