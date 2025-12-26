import { useContext } from "react";
import Header from "../components/layout/Header";
import { AuthContext } from "../context";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ PrivateRoutes ~ auth:", auth);

  return (
    <>
      {auth?.user ? (
        <main className="">
          <Header />
          <div className="container mx-auto py-8">
            <Outlet />
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
