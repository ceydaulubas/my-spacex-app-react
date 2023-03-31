import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Launches, SingleLaunch, Crew, SingleCrew } from "./pages/index";
import { NavBar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/launches" element={<Launches />}></Route>
        <Route path="/launches/:id" element={<SingleLaunch />}></Route>
        <Route path="/crew" element={<Crew />}></Route>
        <Route path="/crew/:id" element={<SingleCrew />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
