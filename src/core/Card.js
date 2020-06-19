import React from 'react'
import{Link} from 'react-router-dom'
import ProductImage from './ProductImage'



const Card = ({product}) => {
    return (
    
        <div className="col-xs-8 col-sm-4 mb-4 mt-2">
            <div className="card">
                <div className="card-header">{product.name}</div>
                    <div className="card-body">
                        <ProductImage item={product} url="product"/>
                        <p>{product.description}</p>
                        <p>{product.price}€</p>
                          <Link to="/">
                             <button className="btn btn-outline-primary mt-2 mb-2" >
                                Voir l'article
                            </button>
                          </Link>
                             <button className="btn btn-outline-warning mt-2 mb-2" >
                                Ajouter au pagner
                            </button>
                    </div>
            </div>
        </div>
    
    )
}

export default Card