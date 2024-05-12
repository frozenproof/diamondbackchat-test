import { ShopButton } from "./shop/app-shop";
import { AiButton } from "./friend/ai-chat";
import { FriendButton } from "./friend/friend-button";
import { CustomerPortal } from "./shop/customer-portal";

const DirectSideBarHeader = () => {
    return ( 
        <div>
            <FriendButton 
            />
            <ShopButton
            />
            <CustomerPortal
            />
            <AiButton
            />
        </div>
     );
}
 
export default DirectSideBarHeader;