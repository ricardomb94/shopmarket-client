import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuth, getCookie} from '../auth/helpers'
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import CreateProduct from './CreateProduct';

const AddProduct = () => {
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        image:'',
        loading:false,
        error:'',
        createProduct:'',
        redirectToprofile:false,
        formData:''
    })
    
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createProduct,
        redirectToprofile,
        formData,
    } = values
    
    const userId = isAuth();
    console.log('USER_ID', userId);
    
    const token = getCookie('token');
    console.log('TOKEN', token);
    
    useEffect(() => {
        setValues({...values, formData: new FormData()})
    },[])
    
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0]: event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }
    const clickSubmit = event => {
       event.preventDefault()
       setValues({...values, error: '', loading: true});
       
       CreateProduct(userId._id, token, formData)
       .then(data => {
        if(error){
            setValues({...values, error: error})
        }else{
            setValues({
                    ...values,
                    name:'',
                    description:'',
                    image:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    // CreateProduct:name
                    
            })
            }
       })
    };
    
    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
            <div className="jumbotron catego text-center text-uppercase text-muted font-x-small">
                    <Zoom right cascade><h4>La création c'est l'intelligence qui s'amuse</h4></Zoom>
                        <Pulse><hr className="bg-danger underline"/></Pulse></div>
                        <h5 className="text-muted">inserez une image</h5>
                <label className="btn btn-danger text-light">
                <input 
                    onChange={handleChange('image')}
                    type="file" 
                    name="image" 
                    accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Nom</label>
                <input 
                onChange={handleChange('name')}
                type="text"
                className="form-control"
                value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea 
                onChange={handleChange('description')}
                className="form-control"
                value={description}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Prix</label>
                <input 
                onChange={handleChange('price')}
                type="number"
                className="form-control"
                value={price}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Categorie</label>
                <select 
                    onChange={handleChange('category')}
                    className="form-control"
                >
                    <option value="5ed029dbb5a62a39bcbca314">Manteaux</option>
                    <option value="5ed029dbb5a62a39bcbca314">Chemise</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Livrason</label>
                <select 
                onChange={handleChange('shipping')}
                className="form-control"
                >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantité</label>
                <input 
                onChange={handleChange('quantity')}
                type="number"
                className="form-control"
                value={quantity}
                />
            </div>
            <button className="btn btn-outline-primary">Créez un Produit</button>
        </form>
        );
    
    return(
        <Layout 
        title="Ajouter un produit" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">{newPostForm()}</div>
            </div>
        </Layout>
        
        
    );
}
export default AddProduct;