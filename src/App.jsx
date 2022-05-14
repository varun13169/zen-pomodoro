import { Routes, Route } from "react-router-dom";
import { SiginInPage, SiginUpPage, SignOutPage, ToDoPage } from "./pages";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDoPage />}></Route>
        <Route path="/signin" element={<SiginInPage />}></Route>
        <Route path="/signup" element={<SiginUpPage />}></Route>
        <Route path="/signout" element={<SignOutPage />}></Route>
      </Routes>
    </div>
  );
}
