import { Children } from "react";

const CatAuthLayout = ({children} :{children: React.ReactNode}) => {
    return ( 
        <div className="bg-red-500">
            {children}
        </div>
     );
}
 
export default CatAuthLayout;