import React, { useState } from "react"
import getStripe from "../../utils/stripejs"
import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CornerSvg from "../../images/svg/service-card-triangle.svg";

const formatPrice = (amount, currency) => {
    let price = (amount / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-US"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
}

const ProductCard = ({ product }) => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async event => {
      event.preventDefault()
      setLoading(true)
      const price = new FormData(event.target).get("priceSelect")
      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({
        mode: "payment",
        lineItems: [{ price, quantity: 1 }],
        successUrl: `${window.location.origin}/`,
        cancelUrl: `${window.location.origin}/`,
      })
      if (error) {
        console.warn("Error:", error)
        setLoading(false)
      }
    }
    return (
      <div className="w-full h-auto rounded-lg bg-white shadow-md relative z-10 p-8 max-w-prose overflow-hidden">
        <form onSubmit={handleSubmit}>
                    
            {
                product.prices.map(price => (
                    <div key={price.id} className="absolute right-0 top-0 h-auto bg-s-turquoise w-full md:bg-transparent md:w-4/5">
                        <button className="flex flex-row text-center text-white relative z-10 items-center justify-center h-16 space-x-1 md:mt-6 md:flex-col md:w-32 md:float-right">
                            <select className="hidden" name="priceSelect">
                                <option key={price.id} value={price.id}>
                                </option>
                            </select>
                            <span>
                                {`${formatPrice(price.unit_amount, price.currency)}`}
                            </span>
                            <span className="mr-4"></span>
                            <FontAwesomeIcon icon={faShoppingCart} className='fa-lg fa-fw md:mt-2 md:mx-auto' />
                        </button> 
                        <CornerSvg className="hidden md:block w-120 h-120 absolute right-0 top-0" />
                    </div>
                ))
            }
            
            <article className="mt-16 md:mt-0 md:space-y-8 space-y-4 z-20 relative md:mr-14">
                <h4 className="word-spacing-wide md:word-spacing-none">{product.name}</h4>                                
                <p>{product.description}</p>
                <Link className="underline block" to={`/services#`}>Read more</Link>
                {/* <Link className="underline block" to={`/services#${service.strapiId}`}>Read more</Link> */}
            </article>

        </form>
      </div>
    )
  }
  export default ProductCard