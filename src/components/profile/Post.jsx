import Comment from "./Comment";

const Post = () => {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* Header */}
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src="./assets/images/avatars/avatar_1.png"
            alt="avatar"
          />
          <div>
            <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
            <div className="flex items-center gap-1.5">
              <img src="./assets/icons/time.svg" alt="time" />
              <span className="text-sm text-gray-400 lg:text-base">
                12 min ago
              </span>
            </div>
          </div>
        </div>

        {/* Action Menu */}
        <div className="relative">
          <button>
            <img src="./assets/icons/3dots.svg" alt="menu" />
          </button>
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src="./assets/icons/edit.svg" alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src="./assets/icons/delete.svg" alt="Delete" />
              Delete
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
        <img
          className="max-w-full mx-auto"
          src="./assets/images/poster.png"
          alt="poster"
        />
        <p className="mt-3">
          Grateful for the incredible experience of serving as the President...
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src="./assets/icons/like.svg" alt="Like" />
          Like
        </button>

        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src="./assets/icons/comment.svg" alt="Comment" />
          Comment(2)
        </button>

        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src="./assets/icons/share.svg" alt="Share" />
          Share
        </button>
      </div>

      {/* Comments */}
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
    </article>
  );
};

export default Post;
