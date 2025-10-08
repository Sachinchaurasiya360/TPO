import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import StaticPage from "./pages/LandingPages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
