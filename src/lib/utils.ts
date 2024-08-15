import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify, KeyLike, SignJWT } from "jose";

const AuthSecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2 days from now")
    .sign(AuthSecretKey as any);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, AuthSecretKey as any, {
    algorithms: ["HS256"],
  });

  return payload;
}
