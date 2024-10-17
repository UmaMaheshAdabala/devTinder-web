import React from "react";

const ProfileCard = ({ user }) => {
  const { firstName, lastName, age, emailId, about, photoUrl } = user;
  return (
    <div>
      <div className="flex justify-center m-5">
        <div className="card card-compact bg-base-100 w-96 shadow-xl ">
          <figure>
            <img src={photoUrl} alt="Profile" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{emailId}</p>
            <p>{about}</p>
            <p>{"Age: " + age}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
