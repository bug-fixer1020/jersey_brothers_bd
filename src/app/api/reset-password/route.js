import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    const client = await clientPromise;
    const db = client.db("jersey_brother_bd");
    const users = db.collection("all_users");
    
    const user = await users.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });
    
    if (!user) {
      return Response.json({ message: "Invalid or expired token" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await users.updateOne(
      { _id: user._id },
      { 
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" }
      }
    );
    
    return Response.json({ message: "Password reset successful" }, { status: 200 });
    
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}