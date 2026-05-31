import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
      const data = await pdfParse(buffer);
      return NextResponse.json({ text: data.text });
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return NextResponse.json({ text: buffer.toString("utf-8") });
    } else {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم. الرجاء رفع ملف PDF أو TXT." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error parsing CV file:", error);
    return NextResponse.json({ error: "فشل قراءة الملف" }, { status: 500 });
  }
}
