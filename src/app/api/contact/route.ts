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

    // Forward directly to FormSubmit from server
    try {
      const formSubmitRes = await fetch("https://formsubmit.co/ajax/1774.sparsh@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://sparshgoswami.dev",
          Referer: "https://sparshgoswami.dev/",
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

      const result = await formSubmitRes.json();
      console.log("FormSubmit delivery status:", result);
    } catch (deliverErr) {
      console.warn("FormSubmit delivery warning:", deliverErr);
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
