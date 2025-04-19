import { useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Fgsuccess({ email }: { email: string }) {
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/login");
    }
  }, [countdown]);

  return (
    <div className="text-xl lg:text-4xl lg:gap-20 flex flex-col justify-center gap-12">
      <p>
        Reset link has been successfully sent to <i>{email}</i>
      </p>
      <p>You will be redirected to login page in {countdown} seconds</p>
      <p>
        Go to{" "}
        <Link
          href="/login"
          className="underline lg:text-5xl text-2xl underline-offset-2"
        >
          Login
        </Link>{" "}
        page
      </p>
    </div>
  );
}
