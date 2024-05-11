"use client"

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
      return ( 
        <div className=""
          style={
            {
              height:"480px",
              width:"480px"
            }
          }
        >
            <span className="input-label"> Name: {productItem.name}</span>
            <br/>
            <span className="input-label"> Price: {productItem.price}</span>
            <img src={productItem.images[0]}
            />
        </div>
      );
  }