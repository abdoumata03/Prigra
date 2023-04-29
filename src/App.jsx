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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LandingPage />} path="/home" />
        <Route element={<PrivateLogin />}>
          <Route element={<Login />} path="/login" />
          <Route element={<ResetPassword />} path="/forgot-password" />
          <Route element={<SetPassword />} path="/reset-password" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<ChooseRole />} path="/roles" exact />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
