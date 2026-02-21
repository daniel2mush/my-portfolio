import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";


export async function POST(req: Request) {
  try {
    // 1. Destructure 'subject' from the request
    const { name, email, subject, message } = await req.json();

    // 2. Validate all 4 fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }

    // 3. Save to Database (including subject)
    await db.insert(contactMessages).values({ 
      name, 
      email, 
      subject, 
      message 
    });

    return NextResponse.json(
      { message: "Message sent successfully!" }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" }, 
      { status: 500 }
    );
  }
}




export async function GET() {
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching messages" }, { status: 500 });
  }
}

