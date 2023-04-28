import React from "react";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
