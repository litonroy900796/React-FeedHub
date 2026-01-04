import React from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostCommentList from "./PostCommentList";

function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* Header */}
      <PostHeader post={post} />
      {/* Body */}
      <PostContent poster={post?.image} content={post?.content} />
      {/* Actions */}

      {/* Comments */}
      <PostCommentList />
    </article>
  );
}

export default PostCard;
