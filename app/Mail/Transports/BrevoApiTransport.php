<?php

namespace App\Mail\Transports;

use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mime\MessageConverter;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BrevoApiTransport extends AbstractTransport
{
    protected string $apiKey;

    public function __construct(string $apiKey)
    {
        parent::__construct();
        $this->apiKey = $apiKey;
    }

    protected function doSend(SentMessage $message): void
    {
        $email = MessageConverter::toEmail($message->getOriginalMessage());

        $sender = current($email->getFrom());
        
        $toAddresses = [];
        foreach ($email->getTo() as $to) {
            $name = $to->getName() ?: '';
            if (empty($name)) {
                $parts = explode('@', $to->getAddress());
                $name = $parts[0];
            }
            $toAddresses[] = [
                'email' => $to->getAddress(),
                'name' => $name,
            ];
        }

        // Prepare attachments if present
        $attachments = [];
        foreach ($email->getAttachments() as $attachment) {
            $attachments[] = [
                'name' => $attachment->getPreparedHeaders()->getHeaderParameter('Content-Disposition', 'filename') ?: 'attachment',
                'content' => base64_encode($attachment->getBody()),
            ];
        }

        $payload = [
            'sender' => [
                'email' => $sender->getAddress(),
                'name' => $sender->getName() ?: 'StegoLock',
            ],
            'to' => $toAddresses,
            'subject' => $email->getSubject(),
            'htmlContent' => $email->getHtmlBody() ?: $email->getTextBody(),
        ];

        if (!empty($attachments)) {
            $payload['attachment'] = $attachments;
        }

        Log::info("Attempting HTTP API email dispatch to: " . implode(', ', array_column($toAddresses, 'email')));

        $response = Http::withHeaders([
            'api-key' => $this->apiKey,
            'content-type' => 'application/json',
            'accept' => 'application/json',
        ])->post('https://api.brevo.com/v3/smtp/email', $payload);

        if ($response->failed()) {
            Log::error("Brevo HTTP API Email Dispatch Failed", [
                'response' => $response->body(),
                'status' => $response->status(),
            ]);
            throw new \Exception('Failed to send email via Brevo API: ' . $response->body());
        }
    }

    public function __toString(): string
    {
        return 'brevo-api';
    }
}
