import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";
import { actions } from "../../actions";
import { usePost } from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function PostEntry({ onCreate }) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { state: profile } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const user = profile?.user ?? auth?.user;
  const { api } = useAxios();

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async (formData) => {
    setIsSubmitting(true);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const data = new FormData();
      data.append("content", formData.content);

      // Try the correct field name for your backend
      // Usually it's one of these: 'image', 'photo', 'file', 'avatar', 'picture'
      if (selectedFile) {
        // Based on the error, try WITHOUT appending the file first
        // to see if content-only works
        data.append("image", selectedFile); // Change this if needed
      }

      console.log("=== Sending FormData ===");
      console.log("Content:", formData.content);
      console.log("Has file:", !!selectedFile);
      if (selectedFile) {
        console.log("File name:", selectedFile.name);
        console.log("File type:", selectedFile.type);
        console.log("File size:", selectedFile.size);
      }

      const response = await api.post(`${BASE_URL}/posts`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });

        reset();
        setPreviewImage(null);
        setSelectedFile(null);

        onCreate();
      }
    } catch (error) {
      console.error("=== Post Creation Error ===");
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.response?.data?.error);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to create post";

      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: errorMessage,
      });

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    const fileInput = document.getElementById("photo");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={
                user?.avatar
                  ? `${BASE_URL}/${user.avatar}`
                  : "/default-avatar.png"
              }
              alt="avatar"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </div>

        {previewImage && (
          <div className="mb-4 relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-64 w-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        )}

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            disabled={isSubmitting}
          ></textarea>
        </Field>

        {errors.root && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
            {errors.root.message}
          </div>
        )}

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEntry;
