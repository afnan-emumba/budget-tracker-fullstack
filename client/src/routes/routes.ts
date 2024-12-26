import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import ForgotPassword from "../pages/auth/forgotPassword/ForgotPassword";
import Expenses from "../pages/expenses/Expenses";
import Analysis from "../pages/analysis/Analysis";
import Profile from "../pages/profile/Profile";

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/reset-password", component: ForgotPassword },
  { path: "/", component: Expenses },
  { path: "/analysis", component: Analysis },
  { path: "/profile", component: Profile },
];

export default routes;
