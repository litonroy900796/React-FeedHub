import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const { auth } = useAuth();
  console.log(user, post);
  console.log("error", error);

  const { api } = useAxios();
  useEffect(() => {
    setLoading(true);

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        setUser(response?.data?.user);
        setPost(response?.data?.posts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [api, auth]);

  if (loading) {
    return <div> Fetching your Profile data...</div>;
  }
  return (
    <div>
      <div>
        Welcome, {user?.firstName} {user?.lastName}
      </div>
    </div>
  );
}

export default ProfilePage;
