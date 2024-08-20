import { PostForm } from "@/components/form/post-form";
import prisma from "@/lib/db";

export default async function UpdatePostPage({
  params,
}: {
  params: { listId: string };
}) {
  const { listId } = params;

  const post: any = await prisma.post.findUnique({
    where: {
      id: listId,
    },
    include: {
      postDetails: true,
    },
  });
  return (
    <div className="mt-[100px]">
      <PostForm type="update" initialData={post} />
    </div>
  );
}
