import React, {useState, useEffect} from 'react';
import Layout from './core/Layout';
import SliderEvent from './components/SliderEvent';
import {getProducts} from './core/Core.js';
import Card from './core/Card';
import Search from './core/Search';


const App = ()=> {
  
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    
    const loadProductsBySell = () =>{
      getProducts('sold').then(data =>{
        if(data.error){
        console.log('DATA ERROR GET PROD', data.error)
          setError(data.error)
        }else{
          setProductsBySell(data)
          console.log('DATA PROD/SELL', data)
        }
      })
    };
    
    const loadProductsByArrival = () => {
      getProducts('createdAt').then(data =>{
        if(data.error){
          setError(data.error)
        }else{
          setProductsByArrival(data)
          console.log('DATA PROD/ARRIVALL', data)
        }
      })
    };
    
    useEffect(() => {
      loadProductsByArrival()
      loadProductsBySell()
    },[])
    
    return(
    
          <Layout>
            <SliderEvent/>
            <p className="text-center text-light mt-1 mb-1 px-2 py-2 goldenrod">Renouvelez votre garde robe avec la sélection de robes stylées. En réduction maintenant, il n'y a jamais eu de meilleur moment pour acheter.</p>
            <Search/>
              <h5 className=" display-4 mb-4 text-center textColor text-uppercase catego darkslategray p-3">Les nouveautées</h5>
              <div className="container central">
              <div className="row">
              {productsByArrival.map((product, i)=>(
                <Card key={i} product={product}/>
            ))}
              </div>
              <h5 className=" display-4 mb-4 mt-5 text-center textColor text-uppercase text-sm catego darkslategray p-3">Meilleures ventes</h5>
              <div className="row">
              {productsBySell.map((product, i)=>(
                <Card key={i} product={product}/>
            ))}
              </div>
              </div>
            
            
          </Layout>
    
    )

};

export default App;
