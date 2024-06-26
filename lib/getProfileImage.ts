import fs from "fs/promises";
import path from "path";

export async function getProfileImage(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "userdata.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.imgUrl || null;
  } catch (error) {
    console.error("Error reading profile image:", error);
    return null;
  }
}
