import {getCookie} from '../auth/helpers';
import axios from "axios";


const token = getCookie('token');


const CreateProduct = (_id, token, product) => {
    return (
        // axios({
        //     method: 'POST',
        //     url: `${process.env.REACT_APP_API}/product/create/${_id}`,
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     data: {product}
        // })
        //     .then(response => {
        //         console.log('ADD PRODUCT RESP.', response);
        //     })
        //     .catch(error => {
        //         console.log('ADD PRODUCT ERROR', error)
        //     })
        fetch(`${process.env.REACT_APP_API}/product/create/${_id}`, {
            method: "POST",
            body: product
        }).then(response => {
                console.log('ADD PRODUCT RESP.', response);
            }).catch(error => {
                console.log('ADD PRODUCT ERROR', error)
            })
    )
}


export default CreateProduct
