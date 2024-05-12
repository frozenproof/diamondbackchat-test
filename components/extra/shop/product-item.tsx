"use client"

import { createCheckoutSession } from "@/lib/shop";
import { useRouter } from "next/navigation";

type Props = {
    productItem: any
  }
  interface Product {
      id: string;
      name: string;
      price: number;
      object: string;
      active: boolean;
      attributes: [],
      created: number;
      images: String[];
      default_price: 'price_1PEpSeFpVG7djWPcuZP8bMTP',
      description: string;
      livemode: false,
      marketing_features: [],
      metadata: {},
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      type: 'service',
      unit_label: null,
      updated: 1715332193,
      url: null
    }
  export const ProductItem = async({productItem}: Props) => {
    // console.log("Product item",productItem)
    const router = useRouter();
    const handleSubscription = async (price_id: string) => {
      const redirectUrl = await createCheckoutSession({ price_id, user_id:"" });
      router.push(redirectUrl);
      };
      return ( 
        <div className=""
          style={
            {
              // height:"280px",
              width:"378px"
            }
          }
        >
            <span className="input-label"> Price: {productItem.price}</span>
            <img src={productItem.images[0]}
            />
            <section>
            <div className="product">
              <div className="description">
                <h3>Name: {productItem.name}</h3>
                <h5>$20.00 / month</h5>
              </div>
            </div>
            <form action="/create-checkout-session" method="POST">
              {/* Add a hidden field with the lookup_key of your Price */}
              <input type="hidden" name="lookup_key" value={productItem.default_price} />
              <button id="checkout-and-portal-button" type="submit"
                onClick={(e:any) =>handleSubscription(productItem.default_price)}
              >
                Checkout
              </button>
            </form>
          </section>
        </div>
      );
  }