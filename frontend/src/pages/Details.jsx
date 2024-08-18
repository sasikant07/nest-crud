import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import { base_url } from "../utils/config";
import { useParams } from "react-router-dom";
import moment from "moment";

const Details = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const get_posts = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/post/${postId}`);
      setPost(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      get_posts();
    }
  }, [postId]);

  return (
    <div>
      <Header />
      <div className="w-[50%] mx-auto p-4 mt-5">
        <img className="w-full h-full" src={post.image} alt="" />
        <h2 className="py-1 text-lg font-bold mt-3">{post.title}</h2>
        <span className="text-gray-500">{moment(post.createdAt).format("LL")}</span>
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default Details;
