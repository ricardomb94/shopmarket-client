import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read} from '../core/Core';
import Card from './Card';



const Product = ({match}) =>{
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    
    const loadSingleProduct = productId => {
        read(productId).then(data =>{
        console.log('PRODUCTID', data)
            if(data.error){
                setError(data.error);
            }else{
                setProduct(data);
            }
        });
    };
    
    useEffect(()=>{
    //Récupérer l'id du produit à partir de l'URL
        const productId = match.params.productId
        console.log(productId)
       loadSingleProduct(productId)
    }, [])
    
    return (
        <Layout
            title="Product page"
            description="Shopmarket"
            className="container"
        >
        <div
         className="mb-5">
            <img src={process.env.PUBLIC_URL + '/media/carousel8.jpg'} alt="model femme" />
    {/*<h1 className="display-4">Fluid jumbotron</h1>*/}
        </div>
            <h4 className="mb-4">Fiche Produit</h4>
            <div className="row">
                {JSON.stringify(product)}
            </div>
        </Layout>
    );
}

export default Product;