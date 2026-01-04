import { useProfile } from "../../hooks/useProfile";
import ProfileImage from "./ProfileImage";
import EditIcon from "../../assets/icons/edit.svg";
import { useState } from "react";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
const ProfileInfo = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [isEdit, setIsEdit] = useState(false);
  const { api } = useAxios();
  const HandleBio = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state.user.id}`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
        setIsEdit(false);
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.massage,
      });
    }
  };
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {state?.error && (
        <p className="py-2 text-base text-red-500">{state.error}</p>
      )}
      {/* Profile Image */}
      <ProfileImage />

      {/* Name & Email */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>

      {/* Bio */}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        {isEdit ? (
          <>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              className="w-full p-3 leading-[188%] text-gray-600 lg:text-lg rounded-md"
              rows={4}
              onChange={(e) => setBio(e.target.value)}
              cols={55}
            ></textarea>
          </>
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        )}
        {isEdit ? (
          <button onClick={HandleBio}>save</button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="flex-center h-7 w-7 rounded-full"
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        )}
      </div>

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
