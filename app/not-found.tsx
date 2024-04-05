import { EvervaultCard } from "@/components/effects/evervault/EvervaultCard";


export default function Custom404() {
       
    return (

        <EvervaultCard
          className="w-full h-full flex flex-col text-center"
        >
        <h1>404 - Page Not Found</h1>
        <div>
          You must have tried to access a page that doesn&#39;t exist anymore , or you simply don&#39;t have such authority.
        </div>
        <a
          href="/meself/friend"
        >
          Click here to return 
        </a>
        </EvervaultCard>
      
    )
  }