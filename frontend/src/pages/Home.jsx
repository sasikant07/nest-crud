import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import { base_url } from "../utils/config";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const get_my_post = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${base_url}/api/post/all/home`);
      setLoader(false);
      setPosts(data.posts);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    get_my_post();
  }, []);

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
                  {p.description.slice(0, 100)}&nbsp;
                  <Link
                    to={`/post/details/${p._id}`}
                    className="text-purple-600"
                  >
                    read more
                  </Link>
                </p>
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

export default Home;
