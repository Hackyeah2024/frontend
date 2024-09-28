import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const files = formData.getAll("videos") as File[];
  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "At least one video file is required." },
      { status: 400 }
    );
  }

  const uploadResults = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    const relativeUploadDir = `/uploads/${formattedDate}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "code" in e &&
        e.code === "ENOENT"
      ) {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      uploadResults.push({
        url: `${relativeUploadDir}/${filename}`,
        name: filename,
      });
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong during file upload." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    message: "Files uploaded successfully",
    files: uploadResults,
  });
}

/*
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files = data.getAll("videos") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json(
      { success: false, message: "No files uploaded" },
      { status: 400 }
    );
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const uploadEndpoint = `${backendUrl}/api/upload`;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      formData.append("videos", new Blob([buffer]), file.name);
    }

    const response = await fetch(uploadEndpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
      ...result,
    });
  } catch (error) {
    console.error("Error uploading files to backend:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload files" },
      { status: 500 }
    );
  }
}

*/
