import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Dashboard from "./components/dashboard";
import Ticket from "./components/ticket/Ticket";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="tickets" element={<Ticket/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
