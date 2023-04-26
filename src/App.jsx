<<<<<<< HEAD
import { ChooseRole, Login } from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private-route.jsx";
import { AuthProvider } from "./context/auth-context.jsx";
=======
import {ChooseRole, Login, LandingPage} from "./pages/index.js";
>>>>>>> login

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Routes>
          <Route element={<Login />} path="/" />
        <Route element={<PrivateRoute />}>
          <Route element={<ChooseRole />} path="/roles" exact />
        </Route>
      </Routes>
    </AuthProvider>
  );
=======
    <div>
      <LandingPage/>
    </div>
  )
>>>>>>> login
}

export default App;
