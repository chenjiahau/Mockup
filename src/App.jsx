import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Example from "./pages/Example";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/members' element={<Members />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/tags' element={<Tags />} />
        <Route path='/documents' element={<Documents />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/example' element={<Example />} />
      </Route>
    </Routes>
  );
}

export default App;
