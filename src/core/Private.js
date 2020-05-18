import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import axios from 'axios';
import {isAuth, getCookie, signout, updateUser} from '../auth/helpers'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Link} from 'react-router-dom';

const Private = ({history}) => {
//On déclare une variable d'état local (ou le State)
const [values, setValues] = useState({
    role:'',
    name:"",
    email:"",
    password:"",
    buttonText:"Modifier"
});
 

 const token = getCookie('token')
 
 useEffect(() => {
    loadProfile()
 },[])
 
 const loadProfile = () => {
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        console.log('PIRVATE PROFILE UPDATE', response)
        const {role, name, email} = response.data
        setValues({...values, role, name, email})
    })
    .catch(error => {
        console.log('PIRVATE PROFILE UPDATE ERROR', error.response.data.error)
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
    // console.log(event.target.value);
    setValues({...values,[name]:event.target.value})
 }
 
 const clickSubmit = event => {
    event.preventDefault()
    setValues({...values, buttonText:' Données envoyées'})
    //On configure Axios pour se connecter à la base de donnée
    axios({
        method: 'PUT',
        url:`${process.env.REACT_APP_API}/user/update`,
        headers: {
            Authorization:`Bearer ${token}`
        },data:{name, password},
    })
    .then(response => {
        console.log('PIVATE PROFILE UPDATE SUCCES', response)
        updateUser(response, () => {
            setValues({...values, buttonText:"Soumis"})
            toast.success('Votre profile a été mis à jour avec succès.');
        });
        
    })
    .catch(error => {
        console.log('PIVATE PROFILE UPDATE ERROR', error.response)
        setValues({...values,buttonText:"Envoyer"})
        toast.error('Quelque chose a mal fonctionnée. Autorisation refusée');
        // toast.error(error.data.error);
    });
 };

 
 const updateForm = () => (
    <form>
        <div className="form-group">
            <label className="text-muted">Role</label>
            <input defaultValue={role}type="texte" className="form-control" disabled/>
        </div>
        <div className="form-group">
            <label className="text-muted">Changer votre nom:</label>
            <input onChange={handleChange('name')} value={name}type="texte" className="form-control"/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input defaultValue={email}type="texte" className="form-control" disabled/>
        </div>
        <div className="form-group">
            <label className="text-muted">Changer votre mot de passe:</label>
            <input onChange={handleChange('password')} value={password} type="texte" className="form-control"/>
        </div>
        <div className="form-group">
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>
    </form>
    );
    
        const userLinks = () => {
            return (
                <div className="card">
                    <h4 className="card-header text-muted">MES LIENS</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/cart">MON PANIER</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/profile/update">MISE A JOUR PROFILE</Link>
                        </li>
                        
                    </ul>
                </div>
            )
        }
        
        const userInfo = () => {
       
            return(
                <div className="card mb-5">
                    <h3 className="card-header text-muted">INFORMATIONS PERSONNELLES</h3>
                        <ul className="list-group">
                           {<li className="list-group-item text-uppercase">
                                { role === "admin" ? "admin" : "compte premium"}</li>}
                            <li className="list-group-item text-uppercase">{name}</li>
                            <li className="list-group-item">{email}</li>
                        </ul>
                </div>
            );
            
        };
        
        const purchaseHistory = () => {
            return(
                <div className="card mb-5">
                <h3 className="card-header text-muted text-uppercase">suivi des commandes</h3>
                    <ul className="list-group">
                        <li className="list-group-item text-uppercase">historique</li>
                    </ul>
            </div>
            )
        }
        
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
                <div className="col-sm">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
                <div className="col-sm">
                    {userLinks()}
                    {updateForm()}
                </div>
            </div>
            
            
            
    
        </Layout>
    )
}

export default Private;