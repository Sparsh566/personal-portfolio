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

    // 1. Submit via Web3Forms if access key is configured in environment
    if (accessKey) {
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
        });

        const resData = await web3Res.json();
        if (web3Res.ok && resData.success) {
          delivered = true;
        }
      } catch (deliverErr) {
        console.warn("Web3Forms delivery warning:", deliverErr);
      }
    }

    // 2. Direct FormSubmit endpoint fallback
    if (!delivered) {
      try {
        await fetch("https://formsubmit.co/ajax/1774.sparsh@gmail.com", {
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
        });
      } catch (formSubmitErr) {
        console.warn("FormSubmit delivery warning:", formSubmitErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent directly to Sparsh's inbox.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
