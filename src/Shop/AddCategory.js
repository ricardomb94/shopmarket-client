import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuth, getCookie} from '../auth/helpers'
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import CreateCategory from './CreateCategory';



const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


//On destruture user à partir du localstorage
    // const {userId} = isAuth(); 
    // console.log(userId)
   const token = getCookie('token');
//    console.log('TOKEN FRONT',token)
   const userId = isAuth();
    // console.log('userId=>', userId);
    
    const handleChange =  (e) => {
        e.preventDefault()
        setError('')
        setName(e.target.value)
    }
    const clickSubmit = (e) => {
       e.preventDefault()
       setError('')
       setSuccess(false)
       
       //Reaquette API pour créer les catégories
     CreateCategory(userId._id, token, {name})
         
    };

    const newCategoryForm = () => (
    
        <form  onSubmit={clickSubmit}>
            <div className="form-control">
                <div className="jumbotron catego text-center text-uppercase text-black font-x-small">
                    <Zoom right cascade><h4>La création c'est l'intelligence qui s'amuse</h4></Zoom>
                        <Pulse><hr className="bg-danger underline"/></Pulse></div>
                            <label className="text-muted">Nom</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={handleChange} 
                                    value={name}
                                    autoFocus
                                    />
                                    <br/>
                                <button type="submit" className="btn btn-outline-danger">Créer une catégorie
                                </button>    
                </div>
        </form>
    );
    
    const showSuccess = () => {
        if(success){
            return <h4 className="text-success">{name} viens d'être créer</h4>;
        }
    }
    
    const showError = () => {
        if(error){
            return <h4 className="text-danger">{name} Le nom doit être unique</h4>;
        }
    }
    
    return(
        <Layout title="Ajouter une nouvelle categorie" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
        
        
    );
};

export default  AddCategory



