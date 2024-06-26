import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { UserProfileSchema } from "../../../lib/userProfileSchema";

const COLLECTION_NAME = "userProfiles";
const DOCUMENT_ID = "mainUser";

export async function GET() {
  try {
    const docRef = db.collection(COLLECTION_NAME).doc(DOCUMENT_ID);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    const data = doc.data();
    const validatedData = UserProfileSchema.parse(data);

    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error reading or validating user data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = UserProfileSchema.parse(body);

    const docRef = db.collection(COLLECTION_NAME).doc(DOCUMENT_ID);
    await docRef.set(validatedData);

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
