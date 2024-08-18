import { UpdateForm } from "@/components/form/update-form";
import { getCurrentUser } from "@/lib/actions/users.action";
import prisma from "@/lib/db";

export default async function ProfileUpdatePage() {
  const currentUser: any = await getCurrentUser();

  return (
    <div className="mt-[100px] flex items-center justify-center">
      <UpdateForm initialData={currentUser} userId={currentUser?.id} />
    </div>
  );
}
