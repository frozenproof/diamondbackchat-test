import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata : Metadata= {
  title: "Sign in",
  description: "Sign in",
};

export default function signInPage() {
  
  return (
    <div>
      <SignIn />
    </div>
  )
}

