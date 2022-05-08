import { Routes, Route } from "react-router-dom";
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDoPage />}></Route>
      </Routes>
    </div>
  );
}
