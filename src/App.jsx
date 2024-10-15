import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";

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
