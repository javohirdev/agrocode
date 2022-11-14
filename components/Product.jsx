import React, { useState, useEffect } from 'react';
import { storage } from '../config';
import { onSnapshot, collection } from 'firebase/firestore';
import '../styles/Product.css'

const Product = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        onSnapshot(collection(storage, 'products'), (snapshot) => {
            setItem(snapshot.docs.map(((doc) => doc.data())));
        })
    }, [])

    return (
        <div className='product'>
            {item.map((post) => {
                return (
                    <div className='card' key={post.id}>
                        <div className='card-header'>
                            <img src={post.image} alt="" />
                            <h4>{post.name}</h4>
                            <span>{post.type}</span>
                        </div>
                        <div className='card-body'>
                            <h4>{post.price}</h4>
                            <h3>{post.city}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Product;