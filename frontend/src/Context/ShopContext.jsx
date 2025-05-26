import React, {createContext, useEffect, useState} from "react";
// import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); // created one context and initialised to null

const getDefaultCart = () => {
    let cart = {};
    for(let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setcartItems] = useState(getDefaultCart()); // this initialises a cart with each product count initially zero
    
    useEffect(() => {
        fetch('https://shopease-backend-dqya.onrender.com/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_product(data));

        // if the auth token is avail then add the cart item 
        if(localStorage.getItem('auth-token')) {
            fetch('https://shopease-backend-dqya.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
            .then((data) => setcartItems(data)); 
        }
    }, [])

    console.log(cartItems)
    
    const addTocart = (itemId) => {
        setcartItems((prev) =>({...prev, [itemId] : prev[itemId] + 1}));
        // console.log(cartItems)
        if(localStorage.getItem('auth-token')) { // user is signed in 
            fetch('https://shopease-backend-dqya.onrender.com/addtocart',{ 
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
}
    const removeFromcart = (itemId) => {
        setcartItems((prev) =>({...prev, [itemId] : prev[itemId] - 1})); // split operator used

        if(localStorage.getItem('auth-token')) {
            fetch('https://shopease-backend-dqya.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((response) => response.json())
            .then((data)=>console.log(data));
        }
    }

    const gettotalcartamount = () => {
        let totalamount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let iteminfo = all_product.find((product) =>product.id ===Number(item))
                totalamount += iteminfo.new_price * cartItems[item];
            }
        }
        return totalamount
    }
    
    const gettotalcartitems = () => { // this gives me the total no of items to be displayed on the navbar
        let totalitem = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                totalitem += cartItems[item];
            }
        }
        return totalitem;
    }

    // using this the context i can use this data in any component
    // all functions and objects as one variable
    const contextValue = {all_product, cartItems, addTocart, removeFromcart, gettotalcartamount, gettotalcartitems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
    // now any childcomp wrapped inside the provider via index.js can access it via usecontext(shopcontext)
}

// used in index.js using this i will provide the info to all the pages
export default ShopContextProvider;
