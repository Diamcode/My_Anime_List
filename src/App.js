import React from "react";
import "./App.css";
import Home from "./Home"; // Import Home component
import MyList from "./Mylist"; // Import MyList component
import Help from "./Help";
import Rankings from "./Rankings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
