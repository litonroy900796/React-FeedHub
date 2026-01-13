import React from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostCommentList from "./PostCommentList";
import PostAction from "./PostAction";

function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* Header */}
      <PostHeader post={post} />
      {/* Body */}
      <PostContent poster={post?.image} content={post?.content} />
      {/* Actions */}
      <PostAction postId={post?.id} commentCount={post?.comments?.length} />
      {/* Comments */}
      <PostCommentList post={post} />
    </article>
  );
}

export default PostCard;
