import React from "react";
import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";

import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  console.log("state", state);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state.user.id
        }/avatar`,
        formData
      );

      dispatch({
        type: actions.profile.IMAGE_UPDATED,
        data: response.data,
      });
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };
  return (
    <div className="relative mb-8 h-[180px] w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="w-full h-full object-cover rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />
      <div>
        <label
          htmlFor="file"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={EditIcon} alt="Edit" />
        </label>
        <input
          type="file"
          id="file"
          hidden
          accept="image/*"
          onChange={handleAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileImage;
