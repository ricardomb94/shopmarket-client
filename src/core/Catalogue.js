import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import SliderEvent from '../components/SliderEvent';
import GetCategories from '../Shop/GetCategories';
import Checkbox from './Checkbox';
import {prices} from '../core/fixedPrices'
import Radiobox from './Radiobox'




const Catalogue =()=> {
    //Déclaration du state pour gérer les Catégories les cas d'erreur et les filtres
    const [catalogFilter, setCatelogFilter] = useState({
        filters: {category: [], price:[]}
    })
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
    }, []);
    
    const handleFilters = (filters, filterBy) => {
        // console.log('Catalogue', filters, filterBy);
        const newFilters = {...catalogFilter}
        newFilters.filters[filterBy] = filters
        
        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        setCatelogFilter(newFilters);
    };
    
    const handlePrice = value => {
        const data = prices;
        let array = [];
        
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
                //   console.log('DATA KEY',data[key].array)
            }
        }
        return array;
    };
    
    
    return(
    
        <Layout className="container-fluid">
          <SliderEvent/>            
            
          <div className="row">
            <div className="col-4">
    {/*{JSON.stringify(categories)}*/}
                <h3>Filtre par catégorie</h3>
                <ul>
                    <Checkbox 
                        categories={categories} 
                        handleFilters={filters => handleFilters(filters, "category")}
                        
                    />
                </ul>
                <h3>Filtre par prix</h3>
                <div>
                    <Radiobox 
                        prices={prices} 
                        handleFilters={filters => handleFilters(filters, "price")}
                        
                    />
                </div>
            </div>
        </div>
        
        
        <div className="col-8">
               {JSON.stringify(catalogFilter)}
            </div>   
        </Layout>
  
  );
};

export default Catalogue;