import { UserButton } from "@clerk/nextjs";

const state = true

export default function Home() {
  return (
    <div className="flex flex-col">
      <a className="text-3xl font-bold text-indigo-500 h-full flex items-center justify-center">
       This is a uwu protected page
      </a>
    <UserButton 
      afterSignOutUrl="/"
    />
    </div>
 );
}
