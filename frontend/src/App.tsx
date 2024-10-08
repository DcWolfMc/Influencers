import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Influencers } from "./page/Influencers";
import { InfluencerDetails } from "./page/InfluencerDetails";
import { Brands } from "./page/Brands";
import { BrandDetails } from "./page/BrandDetails";
import { AuthProvider } from "./context/AuthContext";
import { SignUp } from "./page/signUp/signUp";
import { Login } from "./page/login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfluencerProvider } from "./context/InfluencersContext";
import { BrandProvider } from "./context/BrandsContext";

const InfluencerRoutes = () => (
  <InfluencerProvider>
    <Outlet />
  </InfluencerProvider>
);

const BrandRoutes = () => (
  <BrandProvider>
    <Outlet />
  </BrandProvider>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>

          <Route element={<InfluencerRoutes />}>
            <Route element={<BrandRoutes />}>

              <Route path="/influencers" element={<MainLayout />}>
                <Route index element={<Influencers />} />
                <Route path=":influencerId" element={<InfluencerDetails />} />
              </Route>

              <Route path="/brands" element={<MainLayout />}>
                <Route index element={<Brands />} />
                <Route path=":brandId" element={<BrandDetails />} />
              </Route>

            </Route>
          </Route>

        </Routes>

        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
