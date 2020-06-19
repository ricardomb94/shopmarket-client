import React from 'react'

const ProductImage = ({item, url}) => {
    <div className="product-img">
        <img src={`${url}/${process.env.REACT_APP_API}/images/${item.id}`} alt={item.name} className="mb-3" style={{maxHeight:'100%', maxWidth:'100%'}} />
    </div>
}

export default ProductImage