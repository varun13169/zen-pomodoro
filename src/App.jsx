import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts";
import { SiginInPage, SiginUpPage, SignOutPage, ToDoPage } from "./pages";
import "./styles.css";
import { initTheme } from "./utils/initTheme";

export default function App() {
  const { themeState, setTheme } = useTheme();
  // initTheme(themeState.currentTheme);
  return (
    <div className={`App ${initTheme(themeState)}`}>
      <Routes>
        <Route path="/" element={<ToDoPage />}></Route>
        <Route path="/signin" element={<SiginInPage />}></Route>
        <Route path="/signup" element={<SiginUpPage />}></Route>
        <Route path="/signout" element={<SignOutPage />}></Route>
      </Routes>
    </div>
  );
}
