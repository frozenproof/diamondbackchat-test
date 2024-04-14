import { DirectSideBar } from "../display/direct/direct-sidebar";
import { ServerSideBar } from "../display/server/server-sidebar";

export function NavigationHeavyLoad (
    {
        serverId,
        userProfileIdProp,
    } : {
        serverId?: string;
        userProfileIdProp: string;
    }
) {
    return ( 
    <div
        style={
            {height:"100%"}
        }
    >
        {(serverId) && 
          <ServerSideBar serverId={serverId} />
        }
        {(!serverId && userProfileIdProp) && (
            <DirectSideBar 
                userProfileId={userProfileIdProp}
            />
          )
        }
    </div>
  );
}
 
