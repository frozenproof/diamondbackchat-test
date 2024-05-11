"use client"

import { ProductItem } from "./product-item";

type Props = {
  productsList: any[]
}

export const ProductsDisplay = async({productsList}: Props) => {

    return ( 
        <div>
            Products list is here
            {productsList.map((item: any, i: number) => (
            <ProductItem
                key={i}
                productItem={item}
                />
            ))}
        </div>
    );
}