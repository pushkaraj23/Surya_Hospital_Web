import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/Hero Sections/HomePage";
import AboutMain from "./pages/About Us/AboutMain";
import DepartmentManagement from "./pages/Department Section/DepartmentManagement";

function App() {
  return (
    <div className="bg-mute">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMain />} />
        <Route path="/departments" element={<DepartmentManagement/>} />
      </Routes>
    </div>
  );
}

export default App;
