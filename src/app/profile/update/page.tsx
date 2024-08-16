import { AuthForm } from "@/components/form/auth-form";
import { getCurrentUser } from "@/lib/actions/users.action";

export default async function ProfileUpdatePage() {
  const currentUser: any = await getCurrentUser();

  return (
    <div className="mt-[100px] flex items-center justify-center">
      <AuthForm userId={currentUser?.id} type="update" />
    </div>
  );
}
