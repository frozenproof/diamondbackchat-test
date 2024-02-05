import { Children } from "react";

const CatAuthLayout = ({children} :{children: React.ReactNode}) => {
    return ( 
        <div className="bg-white h-full flex items-center justify-center">
            {children}
        </div>
     );
}
 
export default CatAuthLayout;