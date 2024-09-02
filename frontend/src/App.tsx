import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./page/SignUp/signUp";
import { Login } from "./page/Login/login";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Influencers } from "./page/Influencers";
import { InfluencerDetails } from "./page/InfluencerDetails";
import { Brands } from "./page/Brands";
import { BrandDetails } from "./page/BrandDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>

        <Route path="/influencers" element={<MainLayout />}>
          <Route index element={<Influencers />} />
          <Route path="./:influencer" element={<InfluencerDetails />} />
        </Route>

        <Route path="/brands" element={<MainLayout />}>
          <Route index element={<Brands />} />
          <Route path="./:brand" element={<BrandDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
