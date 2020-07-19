import React from 'react'
import{Link} from 'react-router-dom'
import ProductImage from './ProductImage'



const Card = ({product}) => {
    return (
    
        <div className="col-md-4
        
        mb-4 mt-2">
            <div className="card">
                <div className="card-header text-center text-light catego">{product.name}</div>
                    <div className="card-body text-center">
                        <ProductImage item={product} url="product" />
                        
                        <p>{product.price}€</p>
                          <Link to="/">
                             <button className="btn catego text-light mt-2 mb-2 mr-2" >
                                En savoir +
                            </button>
                          </Link>
                             <button className="btn btn-outline-danger mt-2 mb-2" >
                                Ajouter au pagner
                            </button>
                    </div>
            </div>
        </div>
    
    )
}

export default Card