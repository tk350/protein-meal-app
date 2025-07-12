export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, message } = data;

  if (!name || !email || !message) {
    return new Response("必須項目が足りません", { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail", // 例: Gmail を使う場合
    auth: {
      user: process.env.SMTP_USER, // .envに設定
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // 自分宛に送信（広告などの連絡を受ける想定）
      subject: `お問い合わせ from ${name}`,
      text: `
【名前】${name}
【メールアドレス】${email}
【メッセージ】
${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("メール送信失敗:", err);
    return new Response("サーバーエラーが発生しました", { status: 500 });
  }
}
