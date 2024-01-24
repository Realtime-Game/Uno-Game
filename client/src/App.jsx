import Header from './components/Header';
import Board from "./components/Board"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="dark">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/uno" element={<Board/>} />
      </Routes>
      
      </BrowserRouter>   
    </div>
  );
}

export default App;
