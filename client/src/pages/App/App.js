import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer'
import AppStyles from './App.module.css'
import UserContextProvider from '../../contexts/UserContext';
import SocketContextProvider from '../../contexts/SocketContext';
import { userGet } from "../../utils/userServices"
const Background = lazy(() => import('../../components/Background/Background'))
const HomePage = lazy(() => import('../HomePage/HomePage'));
const UserLoginPage = lazy(() => import('../UserPages/UserLoginPage/UserLoginPage'))
const UserCreatePage = lazy(() => import('../UserPages/UserCreatePage/UserCreatePage'))
const ClassicGamePage = lazy(() => import('../GamePages/ClassicGamePage/ClassicGamePage'))
const MinehunterPage = lazy(() => import('../GamePages/MinehunterPage/MinehunterPage'))


function App() {
  return (
    <div className={AppStyles.App}>
      <Suspense fallback={<div></div>}>
        <Background />
      </Suspense>
      <UserContextProvider>
        <SocketContextProvider>
          <Header />
          <div className={AppStyles.displayContainer}>
            <Suspense fallback={<LoadingContainer></LoadingContainer>}>
              <Switch>
                <Route exact path="/user/login" render={(props) => (!userGet() ? <UserLoginPage {...props} /> : <HomePage />)} />
                <Route exact path="/user/create" render={(props) => (!userGet() ? <UserCreatePage {...props} /> : <HomePage />)} />
                <Route exact path="/game/classic" render={(props) => <ClassicGamePage {...props} />} />
                <Route exact path="/game/minehunter" render={(props) => <MinehunterPage {...props} />} />
                <Route path="/" render={(props) => <HomePage {...props} />} />
              </Switch>
            </Suspense>
          </div>
          <Footer />
        </SocketContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
