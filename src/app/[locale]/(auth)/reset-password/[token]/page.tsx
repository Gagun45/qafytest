import Reset from "@/components/Reset/Reset";
import { connectToDb } from "@/lib/connect";
import { User } from "@/lib/models";

interface Props {
  params: Promise<{ token?: string }>;
}

export default async function ResetPage({ params }: Props) {
  const { token } = await params;

  if (!token) {
    return <main>Missing token in url</main>;
  }

  await connectToDb();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return <main>Token {token} is invalid or has expired</main>;
  }

  return (
    <main>
      <div className="w-full h-full flex justify-center pt-6 items-center">
        <Reset email={user.email} />
      </div>
    </main>
  );
}
