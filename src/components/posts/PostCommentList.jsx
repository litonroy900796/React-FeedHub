import React from "react";
import Comment from "./Comment";
import { useAvatar } from "../../hooks/useAvatar";

function PostCommentList({ post }) {
  const { avatarURL } = useAvatar(post);
  return (
    <div>
      <div className="flex-center  mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 object-cover rounded-full"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="text-gray-300 max-md:text-sm">All Comment ▾</button>
      </div>
      <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
        {post?.comments &&
          post.comments.map((comment) => (
            <Comment
              key={comment.id}
              avatar={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                comment?.author?.avatar
              }`}
              name={comment.author.name}
              text={comment.comment}
            />
          ))}
      </div>
    </div>
  );
}

export default PostCommentList;
