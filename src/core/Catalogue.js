import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import SliderEvent from '../components/SliderEvent';
import {getProducts} from '../core/Core.js';
import Card from '../core/Card';


const Catalogue =()=>{
    return(
    
        <Layout className="container-fluid">
          <SliderEvent/>            
            
          <div className="row">
            <div className="col-4">
                left sidebar
            </div>
            <div className="col-8">
                right 
            </div>
          </div>
          
        </Layout>
  
  );
};

export default Catalogue;