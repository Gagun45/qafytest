import Reset from "@/components/Reset/Reset";
import { Link } from "@/i18n/navigation";
import { connectToDb } from "@/lib/connect";
import { User } from "@/lib/models";
import { getTranslations } from "next-intl/server";

interface Props {
  searchParams: { token?: string };
}

export default async function ResetPage({ searchParams }: Props) {
  const token = searchParams.token;

  const t = await getTranslations("ResetPage");

  if (!token) {
    return (
      <main>
        <section>
          <div className="mainHeading gap-24">
            <h1 className="pageTitle">Token is invalid or has expired</h1>
            <Link
              href="/login"
              className="pageTitle underline underline-offset-2"
            >
              {t("goToLogin")}
            </Link>{" "}
          </div>
        </section>
      </main>
    );
  }

  await connectToDb();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return (
      <main>
        <section>
          <div className="mainHeading gap-24">
            <h1 className="pageTitle">Token is invalid or has expired</h1>
            <Link
              href="/login"
              className="pageTitle underline underline-offset-2"
            >
              {t("goToLogin")}
            </Link>{" "}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Reset email={user.email} />
    </main>
  );
}
