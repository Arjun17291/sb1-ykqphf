import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { FlowEditor } from './components/FlowEditor';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="flow/:id" element={<FlowEditor />} />
          <Route path="flow/new" element={<FlowEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;