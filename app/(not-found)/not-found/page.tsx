import { EvervaultCard } from "@/components/effects/EvervaultCard";
import { ModeToggle } from "@/components/uihelper/mode-toggle";
import { UserButton } from "@clerk/nextjs";


export default function NotFound() {
  return (
    <div className="flex flex-col">
        <EvervaultCard>
            <p className="text-3xl font-bold bg-slate-50 h-full flex items-center justify-center" color="chocolate">
                There is no such page here
            </p>
        </EvervaultCard>
    </div>
 );
}
