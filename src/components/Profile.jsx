import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  return (
    <div>
      {userData && <ProfileCard user={userData} />}
      {userData && <EditProfile />}
    </div>
  );
};

export default Profile;
