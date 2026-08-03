"use client";

import { useRouter } from "next/navigation";
import { resetOnboarding } from "@/actions/user";

export default function ResetButton() {
  const router = useRouter();

  async function handleReset() {
    await resetOnboarding();
    router.push("/onboarding");
    router.refresh();
  }

  return (
    <button
      onClick={handleReset}
      className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Reset Industry
    </button>
  );
}