import React from 'react';
import {BrowserRouter, Switch, Route}from 'react-router-dom';
import App from './App';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './Shop/AddCategory';
import AddProduct from './Shop/AddProduct';
import Catalogue from './core/Catalogue';
import Product from './core/Product';


const Routes =() => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/Catalogue" exact component={Catalogue} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private"  exact component={Private} />
                <AdminRoute path="/Admin" exact component={Admin} />
                <AdminRoute path="/category/create" exact component={AddCategory} />
                <AdminRoute path="/product/create" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
              {/*  <Route path="/product/:productId" exact component={Product} render={props => <Product {...props.match.params} />}/>*/}
            </Switch>
        </BrowserRouter>

    )
}

export default Routes;
