"use server";
import { User } from "@prisma/client";
import prisma from "../db";
import bcryptjs from "bcryptjs";
import { AuthFormType } from "../validation/auth-schema";
import { decrypt, encrypt } from "../utils";
import { cookies } from "next/headers";

export async function signUp(userData: AuthFormType) {
  try {
    const hashedPassword = await bcryptjs.hash(userData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user?.password) {
      return null;
    }

    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      return new Error("Invalid Password");
    }

    const expires = new Date(Date.now() + 10 * 1000);

    const sessionUser = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
    };

    const session = await encrypt({ sessionUser, expires });

    cookies().set("session", session, {
      expires,
      httpOnly: true,
    });
  } catch (error) {
    console.log(`SIGN IN ERROR: ${error}`);
    return error;
  }
}

export async function signOut() {
  cookies().set("session", "", {
    expires: new Date(0),
  });
}

export async function getSession() {
  try {
    const currentSession = cookies().get("session")?.value;
    if (!currentSession) return null;
    const currentUser = await decrypt(currentSession);
    return currentUser;
  } catch (error) {
    console.log(`GET SESSION ERROR: ${error}`);
    return error;
  }
}
