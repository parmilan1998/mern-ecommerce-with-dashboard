import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RootLayout from "../layout/RootLayout";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
