import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/reducer';




class Eproducts extends Component {

    componentDidMount() {
        this.props.getProducts();
    }
    
    render() {
        // console.log(this.props.products);
        let productsToDisplay = this.props.products.map((e, i) => {
            return (
                <div key = {i} >
                    <div>
                        {e.product}
                        <Link to ={`/product/${e.id}`}>
                        <button>
                            details
                        </button>
                        </Link>
                    </div>
                </div>
            )
        })
        return(
            <div>
            <Link to={'/'}>
                <button>home</button>
            </Link>
            <Link to={'/cart'}>
                <button>Cart</button>
            </Link>

                {productsToDisplay}
                           
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {getProducts} )(Eproducts)