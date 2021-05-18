import React, { useEffect } from "react";
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
import Error from './components/Error';

import ChatContainer from './components/Chat/chat_container';
import Sidebar from './components/Sidebar';
import { authenticate } from './store/session';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);



  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Modal />
      <div className={user ? "main-area" : ""}>
        {loaded && user && <Sidebar />}
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
            {/* <ChatContainer /> */}
          </ProtectedRoute>
          <ProtectedRoute path="/modules/:id" exact={true} >
            <Module />
          </ProtectedRoute>
          <ProtectedRoute path="/errors/:id" exact={true} >
            <Error />
          </ProtectedRoute>
        </Switch>
      </div>
      {loaded && user && <ChatContainer />}
    </BrowserRouter>
  );
}

export default App;
