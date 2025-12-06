import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { NavLink } from "react-router-dom";
import AuthIllustration from "../assets/images/auth_illustration.png";
function LoginPage() {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center py-8">
        <div className="max-w-[1368px] flex-1">
          <div className="container grid items-center gap-8 lg:grid-cols-2">
            {/* Illustration & Title */}
            <div>
              <img
                className="mb-12 max-w-full max-lg:hidden"
                src={AuthIllustration}
                alt="auth_illustration"
              />
              <div>
                <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                  FeedHub
                </h1>
                <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                  Create a social media app with features like showing posts,
                  post details, reactions, comments and profile.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <div className="card">
              <LoginForm />

              {/* Register Link */}
              <div className="py-4 lg:py-6">
                <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                  Don’t have account?{" "}
                  <NavLink
                    className="text-white transition-all hover:text-lwsGreen hover:underline"
                    to="/registration"
                  >
                    Create New
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
