import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="flex flex-col">
      <a className="text-3xl font-bold bg-slate-50 h-full flex items-center justify-center" color="chocolate">
       This is a uwu protected page.
       I'm glad you joined my beta version.
      </a>
      <div className="h-full flex items-center justify-center">
      <UserButton 
        showName
        afterSignOutUrl="/login-dbc"
      />

    </div>

    <div className="h-full flex items-center justify-center">
      <ModeToggle />

    </div>

    

    
    </div>
 );
}
