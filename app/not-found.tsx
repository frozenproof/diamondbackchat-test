import { EvervaultCard } from "@/components/effects/EvervaultCard";

export default function Custom404() {

    
    return (

      <div
        className="w-full h-full"
      >
        <EvervaultCard
          className="w-full h-full"
        >
        <h1>404 - Page Not Found</h1>
        <div>
          You must have tried to access a page that doesn't exist anymore , or you simply don't have such authority.
        </div>
        </EvervaultCard>
      </div>
      
    )
  }