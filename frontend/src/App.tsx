import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./page/signUp/signUp";
import { Login } from "./page/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
