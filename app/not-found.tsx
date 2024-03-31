import { CardBody, CardContainer, CardItem } from "@/components/effects/3d-card";
import { EvervaultCard } from "@/components/effects/evervault/EvervaultCard";

import { Link } from "lucide-react";
import { redirect } from "next/navigation";

export default function Custom404() {
       
    return (

        <EvervaultCard
          className="w-full h-full flex flex-col text-center"
        >
        <h1>404 - Page Not Found</h1>
        <div>
          You must have tried to access a page that doesn't exist anymore , or you simply don't have such authority.
        </div>
        <a
          href="/meself"
        >
          Click here to return 
        </a>
        </EvervaultCard>
      
    )
  }