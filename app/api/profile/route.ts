import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { UserProfileSchema } from "../../../lib/userProfileSchema";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "userdata.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const validatedData = UserProfileSchema.parse(data);

    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error reading or validating userdata.json" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = UserProfileSchema.parse(body);

    const filePath = path.join(process.cwd(), "public", "userdata.json");
    await fs.writeFile(filePath, JSON.stringify(validatedData, null, 2));

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 500 }
    );
  }
}
