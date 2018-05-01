import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart, deleteProducts } from '../../ducks/reducer'




class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: []
        }
    }



    componentDidMount() {
        axios
          .get("/auth/me")
          .then(res => console.log("the response", res.data))
          .catch(() => (window.location = process.env.REACT_APP_LOGIN));
        this.props.getCart();
        // console.log(this.props);
      }

      handleQuantity(qty, id) {
        let qtyCopy = Object.assign({}, this.state.quantity);
        qtyCopy[id] = qty;
    
        this.setState({
          quantity: qtyCopy
        });
      }
    
      handleQuantityClick(id, secondId) {
        secondId = String(secondId);
        this.props.cart[id].quantity = this.state.quantity[secondId];
        this.setState({
          quantity: this.state.quantity
        });
        axios
          .put("/api/update", { quantity: this.state.quantity })
          .then(res => console.log(res));
      }

    
    render() {
        const displayProducts = this.props.cart.length
        ? this.props.cart.map((c, i) => {
            // console.log("cart", c);
            return (
              <div key = {i}>
                <div>{c.product}</div>
                <button
                onClick={() => this.props.deleteProducts(c.ecart_id)}
                >
                Delete
              </button>
              <button
                onClick={() => this.handleQuantityClick(i, c.ecart_id)}
              >
                Update
              </button>
              <input
                className="input"
                size="25"
                type="number"
                placeholder={c.quantity}
                onChange={e =>
                  this.handleQuantity(e.target.value, c.ecart_id)
                }
              />
              </div>
            );
          })
        : null;
        return(
            <div>
            <Link to={'/'}>
                <button>home</button>
            </Link>
            <Link to={'/products'}>
                <button>Products</button>
            </Link>
            {displayProducts}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      cart: state.cart
    };
  }
  
  export default connect(mapStateToProps, {deleteProducts, getCart})(Cart);