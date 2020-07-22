import React, {useState, useEffect} from "react";
import GetCategories from '../Shop/GetCategories';
import Card from "./Card";
import {list} from './SearchList'

const Search = () => {
    const [data, setData] = useState({
        categories:[],
        category: "",
        search: "",
        results: [],
        searched: false,
    });
  
    const {categories, category, search, results, searched} = data
   
    
    //Au montage du composant les categories
    useEffect(() => {
        const loadCategories = () => {
            GetCategories().then(data => {
                if(data.error){
                }else {
                    setData({...data, categories: data})
                }
            })
        }
    },[]);
    
    const searchData = () => {
        // console.log("SEARCH", search, category);
        if(search){
            list({search: search || undefined, category})
            .then(response => {
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data, results: response, searched: true});
                }
            })
        }
    }
    
    const searchSubmit = (e) =>{
        e.preventDefault()
        searchData()
    }
    
    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched:false});
    }
    const searchMessage = (searched, results)=>{
        if(searched && results.length > 0){
            return (
                <div 
                    className="alert alert-info alert-dismissible fade show text-center" 
                    role="alert">
                    {results.length} produits trouvés.
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="alert" 
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
          );
        }
        if(searched && results.length < 1){
            return (
                <div 
                    className="alert alert-warning alert-dismissible fade show text-center" 
                    role="alert">
                        aucun produit trouvé.
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="alert" 
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
          );
        }
    }
    
    const searchedProducts = (results = [])=>{
       return(
            <div>
                <h3 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h3>
                <div className="row">
                    {results.map((product, i)=> (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
       );
    };
    
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text rounded bg-light p-3">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select 
                                className="btn mr-2" 
                                onChange={handleChange("category")}
                                >
                                <option className="text-sm text-muted" value="All">Catégorie</option>
                                {categories.map((c, i)=>(
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                                
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control form-control-lg form-control-borderless rounded-lg"
                        onChange={handleChange("search")}
                        placeholder="Recherchez par nom"  
                    />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text"><svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg></button>
                </div>
            </span>
        </form>
                        //    <form  
                        //             className="card card-sm"
                        //             onSubmit={searchSubmit}
                        //             >
                        //         <div className="card-body row no-gutters align-items-center">
                        //             <div className="col-auto">
                        //                 <i className="fas fa-search h4 text-body"></i>
                        //             </div>
                                    
                        //             <div className="col">
                        //                 <input 
                        //                         onChange={handleChange("search")}
                        //                         className="form-control form-control-lg form-control-borderless" 
                        //                         type="search" 
                        //                         placeholder="Search..."
                        //                         />
                        //             </div>
                                   
                        //             <div className="col-auto">
                        //                 <button className="btn btn-lg bkg btn-dark" type="submit">Search</button>
                        //             </div>
                        //         </div>
                                    
                        //    </form>
                            )
                            

                            return (
                                <div className="container-fluid">
                                    <div className="row justify-content-center bg-primary pb-3 pt-5">
                                        <div className="col-12 col-md-10 col-lg-8 mt-0">
                                            {searchForm()}
                                        </div>
                                    </div>
                                    <div className="row justify-content-center pb-3 pt-5">
                                        <div className="col-12 col-md-10 col-lg-8 mt-0">
                                            {searchedProducts(results)}
                                        </div>
                                    </div>
                                </div>
                            
                            // <div className="container h-100">
                            //   <div className="d-flex justify-content-center h-100">
                            //     <div className="searchbar">
                            //       <input className="search_input" type="text" name="" placeholder="Search..."/>
                            //       <a  className="search_icon"><i className="fas fa-search"></i></a>
                            //     </div>
                            //   </div>
                            // </div>
                            )
}

export default Search;