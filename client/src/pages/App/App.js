import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import AppStyles from './App.module.css'
import HomePage from '../HomePage/HomePage';
import UserLoginPage from '../UserPages/UserLoginPage/UserLoginPage';
import UserCreatePage from '../UserPages/UserCreatePage/UserCreatePage';

function App() {
  return (
    <div className={AppStyles.App}>
      <Header />
      <div className={AppStyles.displayContainer}>
        <Switch>
          <Route exact path="/user/login" render={(props) => <UserLoginPage />} />
          <Route exact path="/user/create" render={(props) => <UserCreatePage />} />
          <Route path="/" render={(props) => <HomePage />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
