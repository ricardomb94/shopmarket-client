import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {isAuth, getCookie, signout, updateUser} from '../auth/helpers';
// import AddCategory from './AddCategory';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const Admin = ({history}) => {

//On déclare une variable d'état local (ou le State), que l'on appellera "values" ou useState
const [values, setValues] = useState({
    role:'',
    name:"",
    email:"",
    password:"",
    buttonText:"Modifier"
});
 
 const token = getCookie('token')
 
 useEffect(() => {
    loadAdminProfile()
 },[])
 
 const loadAdminProfile = () => {
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        console.log('ADMIN PROFILE UPDATE', response)
        const {role, name, email} = response.data
        setValues({...values, role, name, email})
    })
    .catch(error => {
        console.log('ADMIN PROFILE UPDATE ERROR', error.response.data.error)
        if(error.response.status === 401){
            signout(()=> {
                history.push('/');
            });
        }
    })
 }
 //destructuring des valeurs du State
 const{role, name, email, password,buttonText} = values;
 
 const handleChange = (name) => (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setValues({...values,[name]:event.target.value})
 }
 
 const clickSubmit = event => {
    event.preventDefault()
    setValues({...values, buttonText:' Données envoyées'})
    //On configure Axios pour se connecter à la base de donnée
    axios({
        method: 'PUT',
        url:`${process.env.REACT_APP_API}/admin/update`,
        headers: {
            Authorization:`Bearer ${token}`
        },data:{name, password},
    })
    .then(response => {
        console.log('ADMIN PROFILE UPDATE SUCCES', response)
        updateUser(response, () => {
            setValues({...values, buttonText:"Soumis"})
            toast.success('Votre profile a été mis à jour avec succès.');
        })
        
    })
    .catch(error => {
        console.log('ADMIN PROFILE UPDATE', error)
        setValues({...values,buttonText:"Envoyer"})
         toast.error('Quelque chose a mal fonctionnée. Veuillez recommencer');
        // toast.error(error.data.error);
    });
 };

 
 const updateForm = () => (

    <form>
        <div className="form-group col-md-6 mb-3">
            <label className="text-muted">Role</label>
            <input defaultValue={role}type="texte" className="form-control" disabled/>
        </div>
        <div className="form-group col-md-6 mb-3">
            <label className="text-muted">Changer votre nom:</label>
            <input onChange={handleChange('name')} value={name}type="texte" className="form-control"/>
        </div>
        <div className="form-group col-md-6 mb-3">
            <label className="text-muted">Email</label>
            <input defaultValue={email}type="texte" className="form-control" disabled/>
        </div>
        <div className="form-group col-md-6 mb-3">
            <label className="text-muted">Changer votre mot de passe:</label>
            <input onChange={handleChange('password')} value={password} type="texte" className="form-control"/>
        </div>
        <div className="form-group col-md-6 mb-3">
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>
    </form>
    );
    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header text-uppercase">admin</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/category/create">
                            Créer une Catégorie
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/product/create">
                            Créer un Produit
                        </Link>
                    </li>
                    
                </ul>
            </div>
        )
    }
    const adminInfo = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header text-uppercase">Profile</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">
                            { isAuth() && isAuth().role === "admin"? "admin" : "Client"}</li>
                    </ul>
            </div>
        );
        
    };
    
    {/*const purchaseHistory = () => {
        return(
            <div className="card mb-5">
            <h3 className="card-header">Suivi des Commandes</h3>
                <ul className="list-group">
                    <li className="list-group-item">Historique</li>
                </ul>
        </div>
        )
    }*/}
    
return(
    <Layout title="Dashboard" description="User Dashboard" className="container">
        <div className="jumbotron text-center text-uppercase">Bonjour {name} Bienvenu!</div>
        {/*<div className="col-md-6 offset-md-3 backgd">
            <ToastContainer/>
            <h4 className="pt-5 text-center private">Bienvenu sur votre espace personel</h4>
            <p className="lead text-center">Mise à jour Profile</p>
            {updateForm()}
</div>*/}
        <div className="row">
            <div className="col-3">
                {adminLinks()}
            </div>
            <div className="col-9">
                {adminInfo()}
                {updateForm()}
{ /* {purchaseHistory()}*/}
            </div>
        </div>
    </Layout>
)
}

export default Admin;