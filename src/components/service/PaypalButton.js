import React from "react"
import Paypal from "gatsby-plugin-paypal"

const PaylpalButton = ({price}) => (
    <Paypal 
      style={{
        shape: 'rect',
        color: 'blue',
        layout: 'horizontal',
        label: 'paypal',
        tagline: 'false'
      }}
      amount={price}
      currency="EUR"
    />
)

export default PaylpalButton