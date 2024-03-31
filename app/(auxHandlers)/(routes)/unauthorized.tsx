import { EvervaultCard } from "@/components/effects/evervault/EvervaultCard";

export default function CustomUnauth() {

    
    return (

      <div
        className="w-full h-full"
      >
        <EvervaultCard
          className="w-full h-full"
        >
        <h1>405 - Unauthorized</h1>
        <div>
          You must have tried to request a change that doesn't exist anymore , or you simply don't have such authority.
        </div>
        </EvervaultCard>
      </div>
      
    )
  }