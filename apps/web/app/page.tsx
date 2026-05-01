import prisma from "@repo/db/client";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      Nextjs Web
      {JSON.stringify(users)}
    </div>
  );
}

export const revalidate = 60;