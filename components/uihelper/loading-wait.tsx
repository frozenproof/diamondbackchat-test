import { EvervaultCard } from "../effects/EvervaultCard"

import { GlowingStarsBackgroundCard } from "../effects/glowing-stars"

export const Loading = ({
}) => {
    return (
        <GlowingStarsBackgroundCard>
                <EvervaultCard
                    className="text-center"
                >
                    (　･ω･)☞	You are now loading into Euphoria
                    
                </EvervaultCard>
        </GlowingStarsBackgroundCard>                             
    )
}