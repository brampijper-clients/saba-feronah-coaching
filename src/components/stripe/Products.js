import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProductCard from "./ProductCard";


const containerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
}


const getData = graphql`
query ProductPrices {
    prices: allStripePrice {
      edges {
        node {
          id
          currency
          unit_amount
          product {
              id
              name
              description
          }
        }
      }
    }
  }
`
const Products = () => {
    const data = useStaticQuery(getData);
    // console.log(data);

    const products = {};
    for ( const { node: price } of data.prices.edges) {
      const product = price.product;

      if (!products[product.id]) {
        products[product.id] = product
        products[product.id].prices = []
      }

      products[product.id].prices.push(price)

    }
    
    return (
      <div style={containerStyles}>
        {
          Object.keys(products).map(key => (
            <ProductCard key={products[key].id} product={products[key]} />
          ))
        }
      </div>
    )
}

export default Products;