import { UserButton } from "@clerk/nextjs";

const state = true

export default function Home() {
  return (
    <div className="flex flex-col">
      <a className="text-3xl font-bold bg-slate-50 h-full flex items-center justify-center" color="chocolate">
       This is a uwu protected page.
       <br>
       I'm glad you joined my beta version.
       </br>
      </a>
      
    <UserButton 
      afterSignOutUrl="/login-dbc"
    />
    </div>
 );
}
