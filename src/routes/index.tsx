import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Loader from "../utils/loader/Loader";

const Login = lazy(() => import("./auth/Login"));
const Contracts = lazy(() => import("./contracts/Contracts"));

export default function RouteController() {
  return useRoutes([
    {
      path: '',
      element: (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/contracts',
      element: (
        <ProtectedRoutes>
          <Suspense fallback={<Loader />}>
            <Contracts />
          </Suspense>
        </ProtectedRoutes>
      ),
    },
  ]);
}
