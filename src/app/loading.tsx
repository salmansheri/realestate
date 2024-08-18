import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="mt-[100px] flex items-center justify-center"
      style={{
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Loader2 className="animate-spin h-32 w-32 text-rose-600" />
    </div>
  );
}
