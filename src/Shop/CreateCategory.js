import {isAuth, getCookie} from '../auth/helpers';
import axios from "axios";


const token = getCookie('token');


const CreateCategory = (_id, token,category) => {
        return (
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/category/create/${_id}`,
                    headers: {
                      Accept: "application/json",
                      Authorization:`Bearer ${token}`
                    },data:{category}
                })
                .then(response => {
                    console.log('ADD CATEGORY RESP.', response);
                })
                .catch(error => {
                    console.log('ADD CATEGORY ERROR', error)
                })
        )}


export default  CreateCategory
