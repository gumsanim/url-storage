import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ThemeProvider } from "styled-components";
import UrlList from "./pages/UrlList/UrlList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/url_list" element={<UrlList />} />
      </Routes>
    </>
  );
}

export default App;
