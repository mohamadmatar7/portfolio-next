import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_TO = process.env.CONTACT_TO_EMAIL!;
const EMAIL_FROM = process.env.CONTACT_FROM_EMAIL!;
const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
  ...(SMTP_PORT === 587 ? { requireTLS: true } : {}),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const hp = String(body?.company || "").trim();
    if (hp) return NextResponse.json({ ok: true });

    if (process.env.NODE_ENV !== "production") {
      await transporter.verify();
    }

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: subject ? `Portfolio: ${subject}` : "Portfolio: New message",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("MAIL_ERROR:", e?.message || e, e);
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
