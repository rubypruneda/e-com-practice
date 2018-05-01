import axios from 'axios';

const initialState = {
   products: [],
   cart: [],
   items: []
}

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_CART = 'GET_CART';
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'



export function getCart() {
    let payload = axios
        .get("/api/cart")
        .then(resp => {
            console.log(resp);
            return resp.data
        })
        .catch(console.log);
    return {
        type: GET_CART,
        payload: payload
    }
}

export function getProducts(products) {
    
        let etems = axios.get('/api/eproducts').then(res => {
            console.log(res)
            return res.data
        }).catch(console.log)
    
        return {
            type: GET_PRODUCTS,
            payload: etems
        }
    }

    export function deleteProducts(id) {
        let items = axios.delete('/api/delete/' + id).then(res => {
            return id
        }).catch(console.log)
    
        return {
            type: DELETE_PRODUCTS,
            payload: items
        }
    }


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART + '_FULFILLED':
            console.log(action.payload)
            return Object.assign({}, state, {
                cart: action.payload
            })
        case GET_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, {
                products: action.payload
            })
        case DELETE_PRODUCTS + '_FULFILLED':
            // console.log(action.payload)
            let tempCart = state.cart.slice().filter( c => c.ecart_id !== action.payload)
            return Object.assign( {}, state, { cart: tempCart });
        default:
            return state;

    }
}