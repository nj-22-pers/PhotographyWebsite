import { NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 1. Store message in Sanity
    await client.create({
      _type: "contactMessage",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    // 2. Send email via Resend
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
