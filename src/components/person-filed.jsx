import React from "react";

const PersonField = (props) => {
  return (
    <div className="flex mb-3 items-center">
      <img
        src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
        alt="Avatar Picture"
        className="w-9 h-9 mr-4 rounded-full"
      />
      <div>
        <div className="flex gap-2">
          <h1 className="text-sm font-medium text-gray1 mb-1">{props.name}</h1>
          {props.invité && (
            <p className="text-sm font-regulat text-gray2">{"• Invité"}</p>
          )}
        </div>
        <p className="text-xs font-regular text-gray3">{props.email}</p>
      </div>
    </div>
  );
};
export default PersonField;
