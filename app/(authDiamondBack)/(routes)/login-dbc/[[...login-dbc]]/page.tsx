import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn 
  appearance={{
    variables: { colorPrimary: 'blue' }
  }}/>;
}