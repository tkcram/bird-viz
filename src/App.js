import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Home from './Home'
import Bird from './Bird'
import Error from './Error'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bird/:name" element={<Bird />} />
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
