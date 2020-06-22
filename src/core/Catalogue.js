import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import SliderEvent from '../components/SliderEvent';
import GetCategories from '../Shop/GetCategories';
// import Card from '../core/Card';



const Catalogue =()=>{
    //Déclaration du state pour gérer les Catégories et cas d'erreur
    const [categories, setCategories] = useState([])
    const [error, setError] = useState([])
    
    const init = () => {
        GetCategories()
        .then(data => {
            if(data.error) {
                setError(data)
            }else{
                setCategories(data);
            }
        });
    };
    //On appelle useEffect au montage du composant pour uploader les données d'affichage du composant
    useEffect(()=>{
        init()
    }, [])
    
    return(
    
        <Layout className="container-fluid">
          <SliderEvent/>            
            
          <div className="row">
            <div className="col-4">
                {JSON.stringify(categories)}
            </div>
            <div className="col-8">
                right 
            </div>
          </div>
          
        </Layout>
  
  );
};

export default Catalogue;