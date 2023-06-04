import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UrlList from "./pages/UrlList/UrlList";
import Layout from "./layouts/Layout";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading";
import UrlListDetail from "./pages/UrlListDetail/UrlListDetail";

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loading message={"Loading"} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url_list" element={<UrlList />} />
            <Route path="/url_list/detail/:id" element={<UrlListDetail />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
