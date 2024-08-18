import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import { base_url } from "../utils/config";
import storeContext from "../context/storeContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({});
  const { store } = useContext(storeContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(post);
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("old_image", post?.image);
    formData.append("new_image", state.image || "");
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${base_url}/api/post/update/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoader(false);
      toast.success(data.message);
      setState(data.post);
      navigate("/post/all")
    } catch (error) {
      console.log(error.response.error.message);
      toast.error(error.response.error.message);
    }
  };

  const get_post = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setState({
        title: data.post?.title,
        description: data.post?.description,
      });
      setImage(data.post?.image);
      setPost(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      get_post();
    }
  }, [postId]);

  return (
    <div>
      <Header />
      <div>
        <div className="w-[80%] p-8 bg-white mx-auto mt-4 rounded-md">
          <h2 className="text-xl font-bold">Create post</h2>
          <form onSubmit={update}>
            <div className="flex flex-col w-full gap-1 mb-3 mt-4">
              <label htmlFor="title">Title</label>
              <input
                onChange={inputHandler}
                value={state.title || ""}
                type="text"
                name="title"
                id="title"
                placeholder="title"
                required
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                rows={10}
                onChange={inputHandler}
                value={state.description || ""}
                type="text"
                name="description"
                id="description"
                placeholder="description"
                required
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo-500 overflow-hidden"
              ></textarea>
            </div>

            {image && (
              <div className="mb-3">
                <img src={image} alt="" />
              </div>
            )}
            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="image">Image</label>
              <input
                onChange={imageHandler}
                type="file"
                id="image"
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <button
              disabled={loader}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-7 py-[6px] text-md"
            >
              {loader ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
