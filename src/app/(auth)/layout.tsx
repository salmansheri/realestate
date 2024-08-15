import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-[100px]  flex items-center justify-center">
      {children}
    </div>
  );
}
