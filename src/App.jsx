import {
  ChooseRole,
  Login,
  LandingPage,
  ResetPassword,
  SetPassword,
  SignUp, 
  ChooseUser, 
  VerifyEmail, 
  FillInfo,
  Dashboard,
  Profile,
  Project,
  Graduation,
  Announcement,
} from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private-route.jsx";
import PublicRoute from "./utils/public-route.jsx";
import { AuthProvider } from "./context/auth-context.jsx";

// Wrap pages not requiring authenticatino in <PrivateLogin/>
// Wrap pages requiring authentication in <PrivateRoute/>

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LandingPage />} path="/" />
           

        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/login" />
          <Route element={<ResetPassword />} path="/forgot-password" />
          <Route element={<SetPassword />} path="/reset-password/:uid/:token" />
          <Route element={<SignUp/>} path="/sign-up"></Route>
          <Route element={<ChooseUser/>} path="/users"></Route>
          <Route element={<VerifyEmail/>} path="/verify-email"></Route>
          <Route element={<FillInfo/>} path="/activate/:uid/:token/:type/:id"></Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<ChooseRole />} path="/roles" exact />
          <Route element={<Dashboard />}>
            <Route element={<Profile />} path="/profile" exact />
            <Route element={<Project />} path="/project" exact />
            <Route element={<Graduation />} path="/soutenance" exact />
            <Route element={<Announcement />} path="/annonces" exact />
          </Route>
          </Route>
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
