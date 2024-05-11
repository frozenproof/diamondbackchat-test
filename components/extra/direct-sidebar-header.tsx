import { ShopButton } from "./shop/app-shop";
import { AiButton } from "./friend/ai-chat";
import { FriendButton } from "./friend/friend-button";

const DirectSideBarHeader = () => {
    return ( 
        <div>
            <FriendButton 
            />
            <ShopButton
            />
            <AiButton
            />
        </div>
     );
}
 
export default DirectSideBarHeader;