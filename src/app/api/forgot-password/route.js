import clientPromise from "@/lib/mongodb";
import { randomBytes } from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const client = await clientPromise;
    const db = client.db("jersey_brother_bd");
    const users = db.collection("all_users");
    
    const user = await users.findOne({ email });
    
    if (!user) {
      return Response.json({ message: "If email exists, reset link will be sent" }, { status: 200 });
    }
    
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    
    await users.updateOne(
      { email },
      { $set: { resetToken, resetTokenExpiry } }
    );
    
    // In production, send email here. For demo, just return token
    return Response.json({ 
      message: "Password reset link generated",
      resetToken: resetToken // Remove in production
    }, { status: 200 });
    
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}