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
  ComiteProjects, 
  ProjectInfo, 
  DatePlanification, 
} from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private-route.jsx";
import PublicRoute from "./utils/public-route.jsx";
import { AuthProvider } from "./context/auth-context.jsx";
import { registerLicense } from "@syncfusion/ej2-base";
import RegistrationSuccess from "./pages/registration-success.jsx";
import ProjectForm from "./pages/project-form.jsx";
import { ProfileProvider } from "./context/profile-context.jsx";
import { ProjectProvider } from "./context/project-context.jsx";

// Wrap pages not requiring authenticatino in <PrivateLogin/>
// Wrap pages requiring authentication in <PrivateRoute/>
//hey

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ProjectProvider>
          <Routes>
            <Route element={<LandingPage />} path="/" />

            <Route element={<PublicRoute />}>
              <Route element={<Login />} path="/login" />
              <Route element={<ResetPassword />} path="/forgot-password" />
              <Route element={<SetPassword />} path="/reset-password/:uid/:token"/>
              <Route element={<SignUp />} path="/sign-up"/>
              <Route element={<ChooseUser />} path="/users"/>
              <Route element={<VerifyEmail />} path="/verify-email"/>
              <Route
                element={<RegistrationSuccess />}
                path="/registration-success"
              ></Route>

              <Route
                element={<FillInfo />}
                path="/activate/:uid/:token/:type/:id"
              ></Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route element={<ChooseRole />} path="/roles" exact />
              <Route element={<Dashboard />}>
                <Route element={<ProjectForm />} path="/project" exact />
                <Route element={<Profile />} path="/profile" exact />
                <Route element={<Graduation />} path="/soutenance" exact />
                <Route element={<Announcement />} path="/annonces" exact />
                <Route element={<ComiteProjects/>} path="/comite-projects"/>
                <Route element={<ProjectInfo/>} path="/project-info"/>
                <Route element={<DatePlanification/>} path='/date-planification'/>

              </Route>
            </Route>
          </Routes>
        </ProjectProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
