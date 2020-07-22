import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read} from '../core/Core';
import Card from './Card';
import Search from '../core/Search';



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
            description={product.description}
            className="container"
        >
        <p className="text-center text-light mt-1 mb-1 px-4 py-4 goldenrod">Renouvelez votre garde robe avec la sélection de robes stylées. En réduction maintenant, il n'y a jamais eu de meilleur moment pour acheter.</p>
        <Search/>
      {/*  <div className="mb-5">
            <img src={process.env.PUBLIC_URL + '/media/carousel8.jpg'} alt="model femme" />
    </div>*/}
            <h4 className="mb-4">{product.name}</h4>
            <div className="row ml-4">
                {product && product.description && <Card product={product}/>}
            </div>
        </Layout>
    );
}

export default Product;