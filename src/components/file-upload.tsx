import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  apiEndPoint: string;
  onChange: (url?: string) => void;
  value?: string;
}
const FileUpload = ({ apiEndPoint, onChange, value }: FileUploadProps) => {
  if (value) {
    return (
      <div className="relative h-40 w-full">
        <Image src={value} alt={value} fill className="object-contain" />
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
