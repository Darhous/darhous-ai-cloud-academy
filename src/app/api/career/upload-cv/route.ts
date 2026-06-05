import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["application/pdf", "text/plain"];

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`career-upload-cv:${ip}`, { limit: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `طلبات كثيرة. انتظر ${rl.resetInSec} ثانية.` },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "حجم الملف يتجاوز الحد المسموح (5 ميغابايت)" },
        { status: 413 }
      );
    }

    const isAllowedType =
      ALLOWED_TYPES.includes(file.type) || file.name.endsWith(".txt");
    if (!isAllowedType) {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم. الرجاء رفع ملف PDF أو TXT." },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
      const data = await pdfParse(buffer);
      return NextResponse.json({ text: data.text });
    } else {
      return NextResponse.json({ text: buffer.toString("utf-8") });
    }
  } catch (error) {
    console.error("Error parsing CV file:", error);
    return NextResponse.json({ error: "فشل قراءة الملف" }, { status: 500 });
  }
}
