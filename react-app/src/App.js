import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Home from './components/Home';
import Splash from './components/Splash';
import Module from './components/Module';
import Modal from './components/Modal';
import ChatContainer from './components/Chat/chat_container';

import { authenticate } from './store/session';
import { fetchAllMessages } from './store/message';
import { fetchAllModules } from './store/module';
import { fetchAllErrors } from './store/error';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);



  useEffect(() => {
    dispatch(authenticate())
    // dispatch(fetchAllMessages())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Modal />
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true} render={(props) => <LoginForm {...props} />} />
          {/* <LoginForm />
        </Route> */}
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/modules/:id" exact={true} >
          <Module />
        </ProtectedRoute>
      </Switch>
      <ChatContainer />
    </BrowserRouter>
  );
}

export default App;
