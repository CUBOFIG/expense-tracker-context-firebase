import React, { useState } from "react";
import firebase from "firebase";
import { fb } from "../../firebase/firebaseSingleton";
import "./Login.scss";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const db = fb.firestore();

  const initialValues = {
    firstName: "",
    email: "",
    password: "",
    code: "",
  };

  const [user, setUser] = useState(initialValues);

  const [userAdd, setUserAdd] = useState({
    emailadd: "",
    passwordadd: "",
  });

  const { emailadd, passwordadd } = userAdd;

  const { firstName, email, password } = user;

  const showMenu = () => {
    document.querySelector("#container").classList.add("right-panel-active");
  };

  const removeMenu = () => {
    document.querySelector("#container").classList.remove("right-panel-active");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeIn = (e) => {
    setUserAdd({
      ...userAdd,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async () => {
    await db.collection(uuidv4()).doc().set({ data: 0 });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const codeauth = uuidv4();
    user.code = codeauth;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        createTask(codeauth);
        delete user.password;
        firebase.database().ref(`/users/${response.user.uid}`).set(user);
        alert("Bienvenido");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(emailadd, passwordadd)
      .then((response) => {
        alert("Bienvenido de nuevo");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="container-class" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={registerSubmit}>
            <h1 className="w-100">Crea una Cuenta</h1>
            <span>Usa tu Correo para registrarte</span>
            <input
              type="text"
              placeholder="Name"
              className="mt-2 inputs"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-2 inputs"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-2 inputs"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <button type="submit" className="mt-2 btn-block button-class">
              Crear
            </button>
          </form>
        </div>
        <div
          className="form-container sign-in-container"
          onSubmit={loginSubmit}
        >
          <form action="#">
            <h1 className="m-0 ">Bienvenido</h1>
            <span className="mb-3">Ingrese sus datos de acceso.</span>
            <input
              type="email"
              placeholder="Email"
              className="mt-2 inputs"
              name="emailadd"
              value={emailadd}
              onChange={handleChangeIn}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-2 inputs"
              name="passwordadd"
              value={passwordadd}
              onChange={handleChangeIn}
            />
            <button type="submit" className="mt-2 btn-block button-class">
              Ingresar
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="m-0 d-none d-sm-block">Bienvenido de Nuevo</h1>
              <p className="mt-2 d-none d-sm-block">
                Para mantenerse conectado con nosotros, inicie sesión con su
                correo.
              </p>
              <button
                className="ghost button-class mt-3"
                id="signIn"
                onClick={() => removeMenu()}
              >
                Ingresar
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="mb-4 d-none d-sm-block">Hola, Amigo!</h1>
              <p className="d-none d-sm-block">
                Registrate y comience a organizar sus gastos.
              </p>
              <button
                className="ghost button-class mt-3"
                id="signUp"
                onClick={() => showMenu()}
              >
                Regristrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
