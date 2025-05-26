import React, { useEffect, useState } from 'react'
import './listproduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allproduct, setAllproducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {setAllproducts(data)});
    }

    // for running the above function whenever this component is mounted we will use useeffect hook
    useEffect(() => {
        fetchInfo();
    },[]) // square bracket so that only fetched once

    const removeproduct =  async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id})
        })
        await fetchInfo();
        // so that the list will be updated
    }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {/* // list all prod got from the api */}
        {allproduct.map((product, index)=>{
            return <>
            <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>₹{product.old_price}</p>
                <p>₹{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeproduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr /> 
            </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
