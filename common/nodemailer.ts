import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface ContractAcceptanceEmailOptions {
  userName: string;
  contractTitle: string;
  contractUrl: string;
  acceptedAt: Date;
  supportEmail?: string;
}

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOTPEmail(to: string, otp: string, actionType: string) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9f9f9;
          padding: 20px;
          max-width: 600px;
          margin: auto;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          max-width: 150px;
        }
        .content {
          text-align: center;
          line-height: 1.6;
        }
        .otp-code {
          display: inline-block;
          margin: 20px auto;
          padding: 10px 20px;
          color: #007BFF;
          background-color: #e9f5ff;
          font-size: 24px;
          font-weight: bold;
          border-radius: 5px;
          border: 1px solid #007BFF;
        }
        .copy-button {
          margin-top: 20px;
          padding: 10px 20px;
          color: #fff;
          background-color: #007BFF;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
  <div class="email-container">
    <div class="content">
      <h2>Your OTP Code</h2>
      <p>We received a request to ${actionType}. Use the OTP code below to proceed:</p>
      <div>
        <div class="otp-code">${otp}</div>
      </div>
      <p>This OTP code is valid for 5 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
    </div>
  </div>
</body>
    </html>
    `;

    await this.transporter.sendMail({
      from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: actionType,
      html: htmlContent,
    });
  }
  async sendLetters(to: string, title: string, message: string) {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f9f9f9;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 150px;
    }
    .content {
      text-align: center;
      line-height: 1.6;
    }
    .title {
      font-size: 28px;
      color: #007BFF;
      margin-bottom: 10px;
    }
    .message {
      font-size: 18px;
      margin: 20px 0;
    }
    .username {
      font-weight: bold;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="content">
      <h2 class="title">${title}</h2>
      <p class="message">${message}</p>
      <p class="username">Sent to: ${to}</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

    await this.transporter.sendMail({
      from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: title,
      html: htmlContent,
    });
  }

  // mail.service.ts
  async sendReservationNotification(
    ownerEmail: string,
    data: {
      reservationId: number;
      venueName: string;
      dates: string;
      userName: string;
      totalPrice: number;
    }
  ) {
    const subject = 'New Reservation Request for Your Venue';

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e328b;">New Reservation Request</h2>
      <p>Dear Venue Owner,</p>
      
      <p>You have received a new reservation request for <strong>${data.venueName['en']}</strong>:</p>
      
      <div style="background: #f5f7fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Reservation ID:</strong> ${data.reservationId}</p>
        <p><strong>Requested Dates:</strong> ${data.dates}</p>
        <p><strong>Total Amount:</strong> SAR ${data.totalPrice.toFixed(2)}</p>
      </div>
      
      <p>Please log in to your vendor dashboard to review and approve this reservation.</p>

    </div>
  `;
    await this.transporter.sendMail({
      to: ownerEmail,
      subject,
      html: htmlContent,
    });
  }

  async sendContractAcceptanceEmail(to: string, opts: ContractAcceptanceEmailOptions) {
    const { userName, contractTitle, contractUrl, acceptedAt, supportEmail = 'support@example.com' } = opts;

    // Format date in English, Cairo timezone
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Cairo',
    }).format(acceptedAt);

    const subject = `Contract Accepted: ${contractTitle}`;

    const htmlContent = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contract Accepted</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      :root {
        --bg:#f4f7fb;
        --card:#ffffff;
        --primary:#6366f1;
        --text:#1f2937;
        --radius:12px;
        --shadow:0 25px 70px -15px rgba(99,102,241,.25);
      }
      *{box-sizing:border-box;}
      body{margin:0;padding:0;background:var(--bg);font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:var(--text);}
      .wrapper{max-width:600px;margin:0 auto;padding:20px;}
      .card{background:var(--card);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);}
      .header{padding:30px;text-align:center;background:linear-gradient(135deg,var(--primary) 0%,#a78bfa 100%);color:#fff;}
      .header h1{margin:0;font-size:24px;}
      .content{padding:30px;}
      .button{display:inline-block;padding:14px 24px;background:var(--primary);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;margin:20px 0;}
      .small{font-size:12px;color:#6b7280;margin-top:10px;}
      .footer{padding:20px;text-align:center;font-size:12px;color:#9ca3af;}
      .details{background:#eef3fb;border-radius:8px;padding:15px;margin:20px 0;}
      .info{margin:8px 0;}
      .label{font-weight:600;}
      ol{padding-left:20px;margin:8px 0;}
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="header">
          <h1>Contract Accepted</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Thank you for accepting the <strong>${contractTitle}</strong>. We recorded your acceptance on <strong>${formattedDate}</strong>.</p>
          <div class="details">
            <div class="info"><span class="label">Contract:</span> ${contractTitle}</div>
            <div class="info"><span class="label">Accepted at:</span> ${formattedDate}</div>
          </div>
          <p>You can view or download the full contract by clicking the button below:</p>
          <p><a href="${contractUrl}" class="button" target="_blank" rel="noopener">View Contract</a></p>
          <p>What happens next:</p>
          <ol>
            <li>Your agreement is now active.</li>
            <li>You may keep a copy for your records.</li>
            <li>If you have questions, contact us at ${supportEmail}.</li>
          </ol>
          <p class="small">If you did not accept this contract, please ignore this email or contact support immediately.</p>
          <p>Best regards,<br/>The ${process.env.PROJECT_NAME || 'Team'}</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ${process.env.PROJECT_NAME || 'Your Project'}. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

    const textContent = `
      Hi ${userName},

      Thank you for accepting the "${contractTitle}". We recorded your acceptance on ${formattedDate}.

      You can view the contract here: ${contractUrl}

      What happens next:
      1. Your agreement is now active.
      2. You may keep a copy for your records.
      3. If you have questions, contact us at ${supportEmail}.

      If you did not accept this, ignore this email or contact support immediately.

      Best regards,
      ${process.env.PROJECT_NAME || 'Team'}
      `;

    await this.transporter.sendMail({
      from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      text: textContent,
    });
  }
}
