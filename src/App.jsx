import { ChooseRole, Login } from "./pages/index.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/private-route.jsx";
import { AuthProvider } from "./context/auth-context.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route element={<Login />} path="/" />
        <Route element={<PrivateRoute />}>
          <Route element={<ChooseRole />} path="/roles" exact />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
