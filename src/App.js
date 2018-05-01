import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Eproducts from './components/Eproducts/Eproducts';
import ProductDetails from './components/Eproducts/ProductDetails';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import { Route, HashRouter, Switch } from "react-router-dom";
// import { Link } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div className="App">
      <a href={process.env.REACT_APP_LOGIN}>
            <button> Login </button>
           </a>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Eproducts /> */}
        <HashRouter>
          <Switch>
            <Route path = '/products' component = {Eproducts} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path = '/cart' component = {Cart}/>
            <Route exact path = '/' component = {Home}/>
          </Switch>
        </HashRouter>
       
      </div>
    );
  }
}

export default App;
