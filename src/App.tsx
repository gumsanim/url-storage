import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
// import UrlList from "./pages/UrlList/UrlList";
import Layout from './layouts/Layout';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading/Loading';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const UrlList = lazy(() => import('../src/pages/UrlList/UrlList'));
const UrlListDetail = lazy(() => import('../src/pages/UrlListDetail/UrlListDetail'));

function App() {
  return (
    <>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/url_list" element={<UrlList />} />
              <Route path="/url_list/detail/:id" element={<UrlListDetail />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
