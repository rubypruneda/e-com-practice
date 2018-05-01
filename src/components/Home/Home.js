import React, {Component} from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Home extends Component {

    
    render() {
        return(
            <div>
                <Link to={'/products'}>
                <button>products</button>
            </Link>
            <Link to={'/cart'}>
                <button>Cart</button>
            </Link>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      cart: state.cart
    };
  }
  
  export default connect(mapStateToProps, null)(Home);