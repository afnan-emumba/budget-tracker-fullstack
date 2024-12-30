import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./routes/PrivateRoute";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import ProfileLayout from "./layouts/profileLayout/ProfileLayout";
import routes from "./routes/routes";
import { antTheme } from "./theme/theme";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <ConfigProvider theme={antTheme}>
        <div className='app-container'>
          <BrowserRouter>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute>
                      {path === "/login" ||
                      path === "/signup" ||
                      path === "/reset-password" ? (
                        <AuthLayout>
                          <Component />
                        </AuthLayout>
                      ) : path === "/profile" ? (
                        <ProfileLayout>
                          <Component />
                        </ProfileLayout>
                      ) : (
                        <MainLayout>
                          <Component />
                        </MainLayout>
                      )}
                    </PrivateRoute>
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        </div>
      </ConfigProvider>
    </UserProvider>
  );
}

export default App;
