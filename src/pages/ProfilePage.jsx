import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";

function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  console.log("state", state);

  const { api } = useAxios();
  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        dispatch({
          type: actions.profile.DATA_FETCHED,
          data: response?.data,
        });
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }
  return (
    <div>
      <div>
        Welcome, {state?.user?.firstName} {state?.user?.lastName}
      </div>
    </div>
  );
}

export default ProfilePage;
