import React, {createContext, useReducer, useState, useLayoutEffect} from 'react'
import {fb as firebase} from '../firebase/firebaseSingleton'
import AppReducer from './AppReducer'
import PropTypes from "prop-types";

const initialState = {
  transactions: []
}

export const GlobalContext =createContext(initialState)

export const GlobalProvider = ({children}) => {
  const [auth, setAuth] = useState(false)
  const [state, dispatch] = useReducer(AppReducer, initialState)

  useLayoutEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            setAuth(snapshot.val());
          });
      }
    });
  };

  const onLogout = () => {
    firebase.auth().signOut();
    window.location.reload();
    return false;
  };

  function deleteTransaction(id){
    dispatch({
      type:'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction){
    dispatch({
      type:'ADD_TRANSACTION',
      payload: transaction
    });
  }
  

  const value = {
    transactions: state.transactions,
    deleteTransaction,
    addTransaction,
    auth,
    onLogout
  }

  return(<GlobalContext.Provider value={value}>
    {children}
  </GlobalContext.Provider>
  
  
  )
}


GlobalProvider.propTypes={
  children: PropTypes.element.isRequired
}
