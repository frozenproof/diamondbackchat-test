import { ProductsDisplay } from "@/components/extra/shop/product-list"; 
import PricingPage from "@/components/extra/shop/product-table";
import Script from 'next/script'

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export async function generateMetadata(
  ) {
    return {
      title: "Shop",
    }
}

const AppShop = async(
    
    ) => {
        
        const { data: products } = await stripe.products.list({
            limit: 3,
          });
        //   console.log("products array",products)
        return (
            
            <div
                    className="w-full bg-transparent h-full flex flex-col text-center overflow-y-scroll"
                >
                    <Script src="https://js.stripe.com/v3/pricing-table.js" />
                    This is our humble shop, where you can buy stuffs and things.
                    <PricingPage 
                    />
                    {/* <ProductsDisplay
                        productsList={products} 
                    /> */}
                    {/* <div
                        className="w-full bg-transparent h-full flex flex-row  items-center justify-center
                        pt-[88px] py-2
                        "
                    >
                        Hello
                    </div> */}
                </div>
        )
    }

export default AppShop    