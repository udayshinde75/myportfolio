import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import { User } from "@/models/user";

export const GET = async (req: Request) => {
  try {
    console.log("Entered In getuserbyid:");
    await connectToDB();
    const url = new URL(req.url);
    //console.log(url);

    const userID = url.searchParams.get("userID"); // ⚠️ Can be null

    console.log("UserID:", userID);

    // ✅ Handle case where no userID is provided
    if (!userID) {
      console.log("No userID provided, returning default user.");
      
      // 🔥 Fetch the default user (e.g., owner)
      const objectId = new mongoose.Types.ObjectId(process.env.NEXT_PUBLIC_OWNER);
      const defaultUser = await User.findById(objectId);

      //console.log("Default UserID:", defaultUser);
      
      if (!defaultUser) {
        return NextResponse.json({ error: "Default user not found" }, { status: 404 });
      }

      return NextResponse.json({
        name: defaultUser.name,
        email: defaultUser.email,
        id: defaultUser._id,
      });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      console.error("Invalid ObjectId format");
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
    }

    //console.log("User Finding By ID...");

    // ✅ Convert to ObjectId safely
    const objectId = new mongoose.Types.ObjectId(userID);

    const user = await User.findById(objectId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User Found:", user);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.error("Error in getuserbyid:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
