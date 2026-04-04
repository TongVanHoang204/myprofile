import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const CV_FILE_NAME = "tong-van-hoang-cv.pdf";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "documents",
    CV_FILE_NAME
  );

  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${CV_FILE_NAME}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("CV download error:", error);
    return NextResponse.json({ error: "CV file not found." }, { status: 404 });
  }
}
