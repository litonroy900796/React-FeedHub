import { useContext } from "react";
import Header from "../components/layout/Header";
import { AuthContext } from "../context";
import { Outlet, Navigate } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ PrivateRoutes ~ auth:", auth);

  return (
    <>
      {auth?.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="">
                <div className="container mx-auto py-8">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
