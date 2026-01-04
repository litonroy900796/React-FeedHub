import React from "react";
import Comment from "./Comment";

function PostCommentList() {
  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      <Comment
        avatar="./assets/images/avatars/avatar_2.png"
        name="Tapas Adhikari"
        text="Great Sumit Saha dada ❤"
      />
      <Comment
        avatar="./assets/images/avatars/avatar_1.png"
        name="Sumit Saha"
        text="Great Sumit Saha dada ❤"
      />
    </div>
  );
}

export default PostCommentList;
