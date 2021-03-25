import React, { useContext, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Balance from "./components/Balance/Balance";
import IncomeExpenses from "./components/IncomeExpenses/IncomeExpenses";
import TransactionList from "./components/TransactionList/TransactionList";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import { GlobalContext } from "context/GlobalState";

import { fb } from "../../firebase/firebaseSingleton";
import "./Admin.scss";
import Navbar from "./components/Navbar/Navbar";

const Admin = () => {
  const [links, setLinks] = useState([]);

  const db = fb.firestore();
  const { auth, onLogout } = useContext(GlobalContext);
  const { firstName } = auth;

  const { code } = auth;

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLinks = () => {
    db.collection(code).onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const addTask = async (linkObject) => {
    try {
      await db.collection(code).doc().set(linkObject);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("are you sure you want to delete this link")) {
      await db.collection(code).doc(id).delete();
    }
  };

  return (
    <div className="admin">
      <Navbar out={onLogout} />
      <div className="admin-box">
        <div className="container ">
          <div className="container-inter">
            <Header className="mb-3" user={firstName} />

            <Balance links={links} />
            <IncomeExpenses links={links} />
            <TransactionList links={links} deleteTask={deleteTask} />
            <AddTransaction addTask={addTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
