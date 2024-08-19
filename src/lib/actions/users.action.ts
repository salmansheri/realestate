"use server";
import bcryptjs from "bcryptjs";
import prisma from "../db";
import { AuthFormType } from "../validation/auth-schema";
import { auth } from "../auth";
import { UpdateFormType } from "../validation/update-schema";

export async function signUp(userData: AuthFormType) {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  try {
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

export async function getCurrentUser() {
  const session = await auth();
  try {
    if (!session?.user?.email) {
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return;
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
    };

    return currentUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateUser(userId: string, userData: UpdateFormType) {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userData,
      },
    });

    return updateUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
