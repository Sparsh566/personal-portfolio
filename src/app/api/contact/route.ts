import { NextResponse } from "next/server";

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

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    let delivered = false;
    let providerError = "";

    // 1. Submit via Web3Forms if a valid access key is configured
    if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
            message,
            from_name: `${name} (Portfolio Inquiry)`,
          }),
          signal: AbortSignal.timeout(7000),
        });

        const contentType = web3Res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const resData = await web3Res.json();
          if (web3Res.ok && resData.success) {
            delivered = true;
          } else {
            providerError = resData.message || "Web3Forms submission failed";
          }
        }
      } catch (deliverErr: unknown) {
        const errMessage = deliverErr instanceof Error ? deliverErr.message : String(deliverErr);
        console.warn("Web3Forms delivery attempt warning:", errMessage);
        providerError = errMessage;
      }
    }

    // 2. Direct FormSubmit endpoint fallback with timeout
    if (!delivered) {
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/1774.sparsh@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
            message,
            _captcha: "false",
            _template: "table",
          }),
          signal: AbortSignal.timeout(6000),
        });

        const contentType = fsRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const fsData = await fsRes.json();
          if (fsRes.ok && (fsData.success === "true" || fsData.success === true)) {
            delivered = true;
          }
        }
      } catch (formSubmitErr: unknown) {
        const errMessage = formSubmitErr instanceof Error ? formSubmitErr.message : String(formSubmitErr);
        console.warn("FormSubmit delivery attempt warning:", errMessage);
      }
    }

    // Pre-calculate instant fallback links
    const mailtoSubject = encodeURIComponent(
      subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:1774.sparsh@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=1774.sparsh@gmail.com&su=${mailtoSubject}&body=${mailtoBody}`;

    if (!delivered) {
      return NextResponse.json(
        {
          success: false,
          error:
            providerError ||
            "Direct automated relay unavailable. Use 1-Click Gmail or Mail app below.",
          mailtoUrl,
          gmailUrl,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been dispatched directly to Sparsh's inbox (1774.sparsh@gmail.com).",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message transmission." },
      { status: 500 }
    );
  }
}
