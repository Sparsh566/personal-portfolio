import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || "1774.sparsh@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    let delivered = false;
    let providerError = "";

    // 1. Send via Gmail SMTP if GMAIL_APP_PASSWORD is set in server environment
    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"${name} (Portfolio Inquiry)" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email,
          subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
          text: `New portfolio contact message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "General Inquiry"}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #232730; border-radius: 8px; background-color: #0b0c0e; color: #f3f4f6;">
              <div style="border-bottom: 2px solid #e10600; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="color: #f3f4f6; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.025em;">PORTFOLIO DIRECT INBOX DISPATCH</h2>
                <p style="color: #8f94a0; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">RECEIVED VIA SPARSHGOSWAMI.DEV</p>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px; font-family: monospace;">
                <tr>
                  <td style="padding: 6px 0; color: #8f94a0; width: 90px; text-transform: uppercase;">Sender:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #f3f4f6;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8f94a0; text-transform: uppercase;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #e10600; text-decoration: none; font-weight: bold;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8f94a0; text-transform: uppercase;">Topic:</td>
                  <td style="padding: 6px 0; color: #f3f4f6;">${subject || "General Inquiry"}</td>
                </tr>
              </table>

              <div style="background-color: #121418; border-left: 4px solid #e10600; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0; color: #f3f4f6; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
              </div>

              <div style="padding-top: 16px; border-top: 1px solid #232730; font-size: 12px; color: #8f94a0; text-align: center; font-family: monospace;">
                Hit Reply in your email client to directly email ${name} (${email}).
              </div>
            </div>
          `,
        });

        delivered = true;
      } catch (smtpErr: unknown) {
        const errMessage = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
        console.error("Gmail SMTP error:", errMessage);
        providerError = "Gmail delivery failed. Check GMAIL_APP_PASSWORD in environment settings.";
      }
    }

    // Pre-calculate instant 1-click fallback links
    const mailtoSubject = encodeURIComponent(
      subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:${gmailUser}?subject=${mailtoSubject}&body=${mailtoBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailUser}&su=${mailtoSubject}&body=${mailtoBody}`;

    if (!delivered) {
      return NextResponse.json(
        {
          success: false,
          error:
            providerError ||
            "Direct automated relay pending server configuration. Use 1-Click Gmail or Mail app below.",
          mailtoUrl,
          gmailUrl,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Your message has been dispatched directly to Sparsh's inbox (${gmailUser}).`,
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message transmission." },
      { status: 500 }
    );
  }
}
