import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import SliderEvent from '../components/SliderEvent';
import GetCategories from '../Shop/GetCategories';
import GetfilteredProducts from '../Shop/GetfilteredProducts';
import Checkbox from './Checkbox';
import {prices} from '../core/fixedPrices';
import Radiobox from './Radiobox';
import Card from '../core/Card';





const Catalogue =()=> {
    //Déclaration du state pour gérer les Catégories les cas d'erreur et les filtres
    const [catalogFilter, setCatalogFilter] = useState({
        filters: {category: [], price:[]}
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    
    
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
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        });
    };
    
    const loadMore = () => {
        let toSkip = skip + limit
        // console.log(newFilters)
        GetfilteredProducts(toSkip, limit, catalogFilter.filters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults, data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };
    
    const loadMoreButton = () => {
        return(
            size > 0 && 
            size >= limit &&(
                <button onClick={loadMore} className="btn btn-info mb-5">
                    Suite
                </button>
            )
        );
        
    };
    
    //On appelle useEffect au montage du composant pour uploader les données d'affichage du composant
    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, catalogFilter.filters)
    }, []);
    
    const handleFilters = (filters, filterBy) => {
        // console.log('Catalogue', filters, filterBy);
        const newFilters = {...catalogFilter}
        newFilters.filters[filterBy] = filters
        
        if(filterBy === 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        
        loadFilteredResults(catalogFilter.filters)
        setCatalogFilter(newFilters);
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
    
        <Layout >
          <SliderEvent/>            
        <div className="container-fluid catalogue">    
          <div className="row row-catalogue">
            <div className="col-3">
    {/*{JSON.stringify(categories)}*/}
                <h4 className="mb-3 mt-5">Filtre par catégorie</h4>
                <ul>
                    <Checkbox 
                        categories={categories} 
                        handleFilters={filters => handleFilters(filters, "category")}
                        
                    />
                </ul>
                <h4 className="mb-4">Filtre par prix</h4>
                <div>
                    <Radiobox 
                        prices={prices} 
                        handleFilters={filters => handleFilters(filters, "price")}
                        
                    />
                </div>
                </div>
                
                <div className="col-8">
                    <h4 className="mb-4 mt-4">Articles</h4>
                    <div className="row">
                        {filteredResults.map((product, i)=> (
                            <Card key={i} product={product}/>
                        ))}
                    </div>
                    <hr/>
                {loadMoreButton()}
                </div>   
            </div>
            </div>
        </Layout>
  
  );
};

export default Catalogue;