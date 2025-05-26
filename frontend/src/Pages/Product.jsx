import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import Productdisplay from '../Components/ProductDisplay/Productdisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';


// this is after we click on the individual product then this page will open

const Product = () => {
  const {all_product} = useContext(ShopContext);// this is using context apis so that i can use this all protect globally
  const {productId} = useParams();// this will grap the id given in the link product:procuctid
  // once i have the product id i will search this product in the all product and show this product
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product = {product}/>
      <Productdisplay product = {product} />
      <Descriptionbox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
