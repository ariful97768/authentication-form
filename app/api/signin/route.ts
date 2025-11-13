// import users from "@/lib/db";
import users from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const usersData = await users.find().toArray();
    return NextResponse.json(usersData);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data) throw new Error("User information isn't provided");

    const email = data?.email;
    if (!email) throw new Error("Email is not provided"!);

    const isExist = await users.findOne({ email });

    if (isExist) return NextResponse.json("Email already used");
    const result = await users.insertOne(data);

    if (result.insertedId)
      return NextResponse.json("User inserted successfully");
    return NextResponse.json(
      "Something bad happened while inserting user information to database!"
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
