import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    try {
      if (feedData) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (!feedData) return;
  if (feedData.length <= 0) return <h1>No New Users Found</h1>;
  return (
    feedData && (
      <div>
        <UserCard data={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
