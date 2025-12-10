import React from "react";

function Field({ label, htmlFor, children, error }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="form-control">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);
  if (child.props.id) return child.props.id;
};
export default Field;
