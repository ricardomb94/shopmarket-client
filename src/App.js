import React, {useState, useEffect} from 'react';
import Layout from './core/Layout';
import SliderEvent from './components/SliderEvent';
import {getProducts} from './core/Core.js';
import Card from './core/Card';



const App = ()=> {
  
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    
    const loadProductsBySell = () =>{
      getProducts('sold').then(data =>{
        if(data.error){
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
    
          <Layout title="" description="Accueil">
          
            <SliderEvent/>
              <h2 className="mb-4">Meilleurs ventes</h2>
              {productsBySell.map((product, i)=>(
                  <Card key={i} product={product}/>
              ))}
              <h2 className="mb-4">Les nouveautées</h2>
              {productsByArrival.map((product, i)=>(
                  <Card key={i} product={product}/>
    ))}
            
            
          </Layout>
    
    )

  };

export default App;
