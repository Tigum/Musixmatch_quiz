import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import { Router } from 'react-router-dom'
import Header from '../src/components/Header'
import Main from './components/Main'
import history from './history'
import store from './store';
import ReduxToastr from 'react-redux-toastr'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Header />
        <div className="App">
          
          <div>
            <Router history={history} >
              <Main />
            </Router>
          </div>
          <ReduxToastr
            timeOut={1500}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
        </div>
      </Provider>
    );
  }
}

export default App; 
