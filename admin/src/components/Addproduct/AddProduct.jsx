import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setimage] = useState(false); // if i choose any image then it will be displayed there
    const [productdetails, setproductdetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    })
    const imagehandler = (e) => {
        setimage(e.target.files[0]);
    }
    const changehandler = (e) => {
        setproductdetails({...productdetails, [e.target.name]: e.target.value}) // spread operator used
    }
    const addproduct = async () => {
        // when we click on addproduct then the data will be send to the backend and any msg that we will get will be displayed in the webpage
        console.log(productdetails)
        let responseData;
        let product = productdetails;

        // form data is used for sending files and key value pairs via an http request
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data)=>{responseData = data});
        if(responseData.success) {
            // image stored using multer and got the url
            product.image = responseData.image_url; 
            // for the product we are getting the image url
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product), // i am converting the product object into json format
            }).then((res) =>res.json().then((data)=> {
                data.success?alert("Product Added") : alert("Failed");
            }))
        }
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productdetails.name} onChange={changehandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productdetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Typye here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productdetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Typye here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetails.category} onChange={changehandler} name="category" className='Add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image) : upload_area}  className = 'addproduct-thumbmail-img' alt="" />
        </label>
        <input onChange={imagehandler} type="file" name='image' id='file-input'  hidden/>
      </div>
      <button onClick={()=>{addproduct()}} className="addproduct-btn">
        ADD
      </button>
    </div>
  )
}

export default AddProduct
