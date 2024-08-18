import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import storeContext from "../context/storeContext";
import axios from "axios";
import { base_url } from "../utils/config";
import moment from "moment";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Allpost = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { store } = useContext(storeContext);

  const get_my_post = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${base_url}/api/post/all`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setLoader(false);
      setPosts(data.posts);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    get_my_post();
  }, []);

  const delete_post = async (postId) => {
    try {
      const { data } = await axios.delete(
        `${base_url}/api/post/delete/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      toast.success(data.message);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div>
      <Header />
      <div className="w-[80%] mx-auto py-10">
        {loader ? (
          "Loading..."
        ) : !loader && posts.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {posts.map((p, i) => (
              <div key={i} className="bg-white p-3 rounded-md block">
                <img className="w-full h-[190px]" src={p.image} alt="" />
                <h2 className="py-1 text-lg font-bold mt-3">{p.title}</h2>
                <span className="text-gray-500">{moment(p.createdAt).format("LL")}</span>
                <p>
                  {p.description.slice(0, 100)}
                  <Link to={`/post/details/${p._id}`} className="text-purple-600">read more</Link>
                </p>
                <div className="mt-2 flex justify-start items-center">
                  <Link
                    to={`/post/edit/${p._id}`}
                    className="px-2 py[2px] bg-yellow-100 text-yellow-800 cursor-pointer rounded-md"
                  >
                    Edit
                  </Link>
                  <div
                    onClick={() => delete_post(p._id)}
                    className="px-2 py[2px] bg-red-100 text-red-800 cursor-pointer rounded-md"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "Posts not found"
        )}
      </div>
    </div>
  );
};

export default Allpost;
