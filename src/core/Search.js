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
    },[]);
    
    const searchData = () => {
        console.log("SEARCH", search, category);
    }
    
    const searchSubmit = (e) =>{
        e.preventDefault()
        searchData()
    }
    
    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched:false});
    }
    
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select 
                                className="btn mr-2" 
                                onChange={handleChange("category")}
                                >
                                <option value="All">Choisissez une catégorie</option>
                                {categories.map((c, i)=>(
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                                
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Recherchez par nom"  
                    />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">Cherchez</button>
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
                                <div className="container-fluid mb-3">
                                {JSON.stringify(categories)}
                                    <div className="row justify-content-center text-co pb-3 pt-5">
                                        <div className="col-12 col-md-10 col-lg-8 mt-0">{searchForm()}</div>
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