import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import AddNew from "./components/AddNew";
import Edit from "./components/Edit";
import UserCard from "./components/UserCard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App flex justify-center ">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route>
            <Route path="" element={<Home />} />
            <Route path="/:id" element={<UserCard />} />
          </Route>
          <Route path="/New" element={<AddNew />} />
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
