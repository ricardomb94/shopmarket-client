import React from 'react'

const ProductImage = ({item, url}) => (
    <div className="product-img">
        <img 
            src={`${process.env.REACT_APP_API}/${url}/image/${item._id}`} 
            alt={item.name} 
            className="mb-3" 
            style={{maxHeight:'500px', maxWidth:'100%'}} 
            />
    </div>
    )

export default ProductImage