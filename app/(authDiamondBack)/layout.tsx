import { Children } from "react";

const CatAuthLayout = ({children} :{children: React.ReactNode}) => {
    return ( 
        <div className="bg-blue-500 h-full flex items-center justify-center">
            {children}
        </div>
     );
}
 
export default CatAuthLayout;