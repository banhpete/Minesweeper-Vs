import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import AppStyles from './App.module.css'
import HomePage from '../HomePage/HomePage';
import UserLoginPage from '../UserPages/UserLoginPage/UserLoginPage';
import UserCreatePage from '../UserPages/UserCreatePage/UserCreatePage';
import UserContextProvider from '../../contexts/UserContext';
import SocketContextProvider from '../../contexts/SocketContext';
import { userGet } from "../../utils/userServices"
import ClassicGamePage from '../GamePages/ClassicGamePage/ClassicGamePage';
import MinehunterPage from '../GamePages/MinehunterPage/MinehunterPage';

function App() {
  return (
    <div className={AppStyles.App}>
      <UserContextProvider>
        <SocketContextProvider>
          <Header />
          <div className={AppStyles.displayContainer}>
            <Switch>
              <Route exact path="/user/login" render={(props) => (!userGet() ? <UserLoginPage {...props} /> : <HomePage />)} />
              <Route exact path="/user/create" render={(props) => (!userGet() ? <UserCreatePage {...props} /> : <HomePage />)} />
              <Route exact path="/game/classic" render={(props) => <ClassicGamePage {...props} />} />
              <Route exact path="/game/minehunter" render={(props) => <MinehunterPage {...props} />} />
              <Route path="/" render={(props) => <HomePage />} />
            </Switch>
          </div>
          <Footer />
        </SocketContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
