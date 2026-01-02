import { useContext } from "react";
import Header from "../components/layout/Header";
import { AuthContext } from "../context";
import { Outlet, Navigate } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ PrivateRoutes ~ auth:", auth);

  return (
    <>
      {auth?.authToken ? (
        <>
          <ProfileProvider>
            <Header />
            <main className="">
              <div className="container mx-auto py-8">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
