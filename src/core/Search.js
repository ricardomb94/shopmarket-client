import React, {useState, useEffect} from "react";
import {getProducts} from '../core/Core.js';
import Card from "./Card";

const Search = () => {
    return (
        <div className="container-fluid">
	<div className="row justify-content-center catego pb-3">
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