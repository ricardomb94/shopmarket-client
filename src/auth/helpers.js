
import cookie from 'js-cookie';


//set in cookie
export const setCookie = (key, value)=> {
    if(typeof window !== 'undefined'){
       cookie.set(key, value, {
        expires:1
       })
    }
}

//remove from cookie
export const removeCookie = (key)=> {
    if(typeof window !== 'undefined'){
       cookie.remove(key, {
        expires:1
       })
    }
}

//get from cookie such as stored token
export const getCookie = (key)=> {
    if(typeof window !== 'undefined'){
       return cookie.get(key)
    }
}
//set in localstorage
export const setLocalStorage = (key, value)=> {
    if(typeof window !== 'undefined'){
       localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = (key)=> {
    if(typeof window !== 'undefined'){
       localStorage.removeItem(key)
    }
}


//Authentifier l'utilisateur grâce aux infos stockées dans le cookie et le localStarage lors de la connexion
export const authenticate = (response, next)=> {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE')
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next();
}

//Accéder aux infos utilisateurs à partir du localstorage
export const isAuth = ()=> {
    if(typeof window !== 'undefined'){
       const cookieChecked = getCookie('token')
       if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else {
                return false;
            }
       }
    } 
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response, next) =>{
    console.log('UPDATE USER IN LOCAL STORAGE HELPERS', response)
    if(typeof window !== 'undefined'){
    //Obtenir les infos de l'utilisateur authentifié depuis le locle storage
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next();
};

//Vérifier que le header du token n'est pas undefined, si c'est le cas, return Forbidden (403)
// const checkToken = (req, res, next) => {
//     const header = req.headers['authorization'];

//     if(typeof header !== 'undefined') {
//         const bearer = header.split(' ');
//         const token = bearer[1];

//         req.token = token;
//         next();
//     } else {
//         //Si le header est undefined return Forbidden (403)
//         res.sendStatus(403)
//     }
// }