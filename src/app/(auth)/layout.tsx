import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-[100px] py-10 flex items-center justify-center h-screen">
      {children}
    </div>
  );
}
