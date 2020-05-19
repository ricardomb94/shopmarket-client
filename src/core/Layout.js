import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import{Link,withRouter} from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';


const Layout = ({children, match, history}) => {
    const isActive = path => {
        if (match.path === path){
            return {color:'#c9945e'};
        }else {
            return{color:'#fff'};
        }
    };
    const nav = () => (
        <nav className="navbar navbar-expand-sm sticky-top navbar-light bg-primary catego">
            {/*<a className="navbar-brand" href="#">SHOP-MARKET</a>*/}
            <Link to="/" className="navbar-brand py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
          </Link><div className="text-medium">E->SHOP</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav container d-flex flex-column flex-md-row justify-content-around">
                    <li className="nav-item ">
                        <Link to="/" className="nav-link" style={isActive('/')}>
                            Accueil {/*{JSON.stringify(match)}*/}
                        </Link> 
                    </li>
                    
                    {!isAuth() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link"  style={isActive('/Signup')}>
                                    Signup
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link"  style={isActive('/Signin')}>
                                    Signin
                                </Link> 
                            </li>
                        </Fragment>
                    )}
                    {isAuth()&& isAuth().role === 'admin' &&(
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive('/admin')} to="/admin">
                                {isAuth().name}
                            </Link>
                        </li>
                    )}
                    
                    {isAuth() && isAuth().role === 'subscriber' && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive('/private')} to="/private">
                                {isAuth().name}
                            </Link>
                        </li>
                    )}
                    
                    {isAuth()&& (
                        <li className="nav-item">
                            <span 
                                className="nav-link"
                                style={{cursor: 'pointer', color:'#fff'}}
                                onClick={() => {
                                        signout(()=> {
                                            history.push('/')
                                        });
                                    }}
                            >
                                Signout
                            </span>
                        </li> 
                    )}
                 
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive('/')}>Panier</Link>
                    </li>
                </ul>
            </div>
        </nav>
)
    return (
        <Fragment>
            {nav()}
            <div className="container-fluid">
                {children}
            </div>
            {Footer()}
        </Fragment>
    )
};

export default withRouter(Layout);