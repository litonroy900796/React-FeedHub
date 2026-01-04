const Comment = ({ avatar, name, text }) => {
  return (
    <div className="flex items-center gap-3 pt-4">
      <img className="max-w-6 max-h-6 rounded-full" src={avatar} alt="avatar" />
      <div className="flex gap-1 text-xs lg:text-sm">
        <span>{name}:</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Comment;
