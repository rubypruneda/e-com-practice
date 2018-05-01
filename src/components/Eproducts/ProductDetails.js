import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getProducts } from "../../ducks/reducer";
import { Link } from 'react-router-dom';


class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }


  

  componentWillMount() {
    console.log(this.props.match.params);
    
    axios.get(`/api/product/${this.props.match.params.id}`).then( response => {
      console.log(response)
      this.setState({
        products: response.data[0]
      })
    }).catch(console.log);
  }

  addToCart() {
    axios.post('/api/hold', {
      itemID: this.props.match.params.id
    });
    console.log(this.props.match.params); 
    console.log('state', this.state.products);   
  }


  render() {
    return (
      <div>
      <Link to={'/'}>
                <button>home</button>
            </Link>
            <Link to={'/products'}>
                <button>Products</button>
            </Link>
            <Link to={'/cart'}>
                <button>Cart</button>
            </Link>
          <div>{this.state.products.product}</div>
             <a>
             <button onClick={() => {
                 this.addToCart();;
               }}> 
               ADD ME TO CART!
             </button>
           </a>
    
      </div>
    )
  }
}
    function mapStateToProps( state ) { 
     return state;
    };

  export default connect(mapStateToProps, { getProducts })(ProductDetails)




