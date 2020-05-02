import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { axiosWithAuth } from "./utils/axiosWithAuth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      axiosWithAuth()
        .get("/jokes")
        .then((res) => {
          console.log(res.data);
          setList(res.data);
        });
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);
  return (
    <div>
      <h1> Hello there, everyone!</h1>
      <LoginForm setLoggedIn={setLoggedIn}></LoginForm>
      {loggedIn ? <h1>You are logged in</h1> : <h1>failed to login</h1>}
      <div>
        {list ? list.map((item) => <h3 key={item.id}>{item.joke}</h3>) : null}
      </div>
    </div>
  );
}

export default App;
