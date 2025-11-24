import { NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!token) {
      console.error("SANITY_API_READ_TOKEN is not set (needs write permissions)");
      return NextResponse.json(
        { error: "Data store not configured" },
        { status: 500 }
      );
    }

    // 1. Store message in Sanity
    try {
      await client.create({
        _type: "contactMessage",
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
    } catch (createErr) {
      console.error("Sanity write failed", createErr);
      return NextResponse.json(
        { error: "Unable to save message. Check Sanity token permissions." },
        { status: 500 }
      );
    }

    // 2. Send email via Resend
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Website Contact Form <onboarding@resend.dev>",
        to: "judelsonnoah@gmail.com",
        subject: `New Contact Message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Resend send failed", emailErr);
      return NextResponse.json(
        { error: "Email failed to send. Check Resend key/domain." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
