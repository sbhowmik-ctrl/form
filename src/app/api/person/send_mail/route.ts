import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();
    console.log("send_mail request", { to, subject, text });

    // ensure we have the right variable name; .env uses SMTP_PASSWORD
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    console.log("smtp creds:", { smtpUser: !!smtpUser, smtpPass: !!smtpPass, host: process.env.SMTP_HOST, port: process.env.SMTP_PORT });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true if 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}