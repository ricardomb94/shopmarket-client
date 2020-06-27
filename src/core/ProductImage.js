import React from 'react'
import ReactImageMagnify from 'react-image-magnify';



const ProductImage = ({item, url}) => (
    <div className="product-img shadow overflow">
        <img 
            src={`${process.env.REACT_APP_API}/${url}/image/${item._id}`} 
            alt={item.name} 
            className="mb-3 card-img-top" 
            // style={{maxHeight:'500px', maxWidth:'100%'}} 
            />
    </div>
)

export default ProductImage

