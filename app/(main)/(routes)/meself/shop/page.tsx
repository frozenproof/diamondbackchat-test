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
        
        // const { data: products } = await stripe.products.list({
        //     // limit: 3,
        //     active: true
        //   });
          
        //   console.log("products array",products)
        return (
            
            <div
                    // className="w-full bg-transparent h-full flex flex-col text-center overflow-y-scroll"
                >
                    <div
                        className="w-full bg-transparent h-full flex flex-row  items-center justify-center
                        pb-[88px] py-2
                        "
                    >
                        PLease note that we do not refund under any circumstance right now.
                        <br/>
                        However, we will not charge more money for cancelled subscription, and you can access user portal to change the billing information.
                        <br/>
                        It may takes up to 24 hours for the changes to take effect on our app, but it will not affect your app billing.
                    </div>                    
                    <Script src="https://js.stripe.com/v3/pricing-table.js" />
                    {/* This is our humble shop, where you can buy stuffs and things. */}

                    {/* <ProductsDisplay
                        productsList={products} 
                    /> */}
                    
                    <PricingPage 
                    />
                    
                </div>
        )
    }

export default AppShop    