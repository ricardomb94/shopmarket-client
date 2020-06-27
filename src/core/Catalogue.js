import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import SliderEvent from '../components/SliderEvent';
import GetCategories from '../Shop/GetCategories';
import GetfilteredProducts from '../Shop/GetfilteredProducts';
import Checkbox from './Checkbox';
import {prices} from '../core/fixedPrices'
import Radiobox from './Radiobox'





const Catalogue =()=> {
    //Déclaration du state pour gérer les Catégories les cas d'erreur et les filtres
    const [catalogFilter, setCatelogFilter] = useState({
        filters: {category: [], price:[]}
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setKip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);
    
    
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
    
    const loadFilteredResults = newFilters => {
        // console.log(newFilters)
        GetfilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data)
            }
        })
    } 
    //On appelle useEffect au montage du composant pour uploader les données d'affichage du composant
    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, catalogFilter.filters)
    }, []);
    
    const handleFilters = (filters, filterBy) => {
        // console.log('Catalogue', filters, filterBy);
        const newFilters = {...catalogFilter}
        newFilters.filters[filterBy] = filters
        
        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        
        loadFilteredResults(catalogFilter.filters)
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
            <div className="col-8">
               {JSON.stringify(filteredResults)}
            </div>   
        </div>
        
        
        
        </Layout>
  
  );
};

export default Catalogue;