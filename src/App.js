import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import Run from './Run';
import ShopReview from './ShopReview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/run" element={<Run />} />
        <Route path="/shopreview" element={<ShopReview />} />
      </Routes>
    </Router>
  );
};

export default App;
