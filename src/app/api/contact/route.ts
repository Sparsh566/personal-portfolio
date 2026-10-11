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

    // Server-side logging for the inquiry
    console.log("New Portfolio Contact Submission:", {
      name,
      email,
      subject: subject || "Portfolio Inquiry",
      message,
      timestamp: new Date().toISOString(),
    });

    // If an external service API key is present in environment, it can be forwarded here
    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
