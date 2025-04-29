import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();
  return <main>User Email: {session?.user.email}</main>;
}
