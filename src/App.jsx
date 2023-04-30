import {
  ChooseRole,
  Login,
  LandingPage,
  ResetPassword,
  SetPassword,
} from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private-route.jsx";
import PrivateLogin from "./utils/private-login.jsx";
import { AuthProvider } from "./context/auth-context.jsx";

// Wrap pages not requiring authenticatino in <PrivateLogin/>
// Wrap pages requiring authentication in <ProvateRoute/>

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<PrivateLogin />}>
          <Route element={<Login />} path="/login" />
          <Route element={<ResetPassword />} path="/forgot-password" />
          <Route element={<SetPassword />} path="/reset-password/:uid/:token" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<ChooseRole />} path="/roles" exact />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
