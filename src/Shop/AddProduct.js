import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuth, getCookie} from '../auth/helpers'
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import CreateProduct from './CreateProduct';
import getCategories from './GetCategories';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        createdProduct:'',
        redirectToprofile:false,
        formData: new FormData()
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
        createdProduct,
        redirectToprofile,
        formData,
    } = values

//Afficher les categories


    const userId = isAuth();
    const token = getCookie('token');

    useEffect(() => {
        // setValues({...values, formData: new FormData()})
        init();
        
    },[])
    
    const init = () => {
        getCategories()
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            }else{
                setValues({...values, categories: data, formData: new FormData()
                
                });;
            }
        });
    };

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0]: event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }
    const clickSubmit = async event => {
       event.preventDefault()
       setValues({...values, error: '', loading: true});
       await CreateProduct(userId._id, token, formData)
       .then(data =>{
                setValues({
                    ...values,
                    name:"", 
                    description:"",
                    image:"",
                    price:"",
                    quantity:"",
                    loading:false,
                    createdProduct:''
                })
                toast.success('Votre produit a été crée avec succès');
                
       })
       .catch(error => {
            console.log(error)
            toast.error(error.response.data.error);
       })
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit} encType="multipart/form-data">
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
                <label className="text-muted">Categories</label>
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                >
                    <option>Choisissez une catégorie</option>
                    {categories&&categories.map((c,i)=> (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Mode de Livrason</label>
                <select
                onChange={handleChange('shipping')}
                className="form-control"
                >
                    <option className="text-muted" >Choisissez</option>
                    <option value="0">Express</option>
                    <option value="1">Standard</option>
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

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>{error}</div>
    )    
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`}a été crée</h2>
        </div>
    )    
    const showLoading = () => (
        loading && (<div className="alert alert-success" style={{display: createdProduct ? '' : 'none' }}>
            <h2>Loading...</h2>
        </div>)
    )    
    
    return(
        <Layout
        title="Ajouter un produit" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                <ToastContainer/>
                {newPostForm()}
                {showLoading()}
                {showSuccess()}
                {showError()}
                </div>
            </div>
        </Layout>


    );
}
export default AddProduct;
