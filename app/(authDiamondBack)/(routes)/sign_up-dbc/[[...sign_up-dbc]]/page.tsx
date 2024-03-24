import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
 
export const metadata : Metadata= {
  title: "Sign up",
  description: "Sign up",
};

export default function Page() {
  return <SignUp />;
}