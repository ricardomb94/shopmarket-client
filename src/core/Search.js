import React, {useState, useEffect} from "react";
import GetCategories from '../Shop/GetCategories';
import Card from "./Card";


const Search = () => {
    const [data, setData] = useState({
        categories:[],
        category: "",
        search: "",
        results: [],
        searched: false
    });
  
    const {categories, category, search, results, searched} = data
    const loadCategories = () => {
        GetCategories().then(data => {
            if(data.error){
                console.log(data.error)
            }else {
                setData({...data, categories: data})
            }
        })
    }
    
    //Au montage du composant les categories
    useEffect(() => {
        loadCategories()
    },[])

    return (
        <div className="container-fluid">
        {JSON.stringify(categories)}
	<div className="row justify-content-center text-co pb-3 pt-5">
                        <div className="col-12 col-md-10 col-lg-8 mt-0">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    
                                    <div className="col">
                                        <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search..."/>
                                    </div>
                                   
                                    <div className="col-auto">
                                        <button className="btn btn-lg bkg btn-dark" type="submit">Search</button>
                                    </div>
                                </div>
                            </form>
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