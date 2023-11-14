import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connectDB from "@/libs/mongodb";
import { error } from "console";

export async function POST(req: Request) {
  const { fullname, email, password } = await req.json();
  console.log(fullname, email, password);

  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters long",
      },
      {
        status: 400,
      }
    );

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already in use",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json({
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email
    });

  } catch (error) {
    console.log(error);
    if(error instanceof Error){

        return NextResponse.json({
            message: error.message
        },{
            status: 400
        });
    }
  }
}
