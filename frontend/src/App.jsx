import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import AllPost from "./pages/AllPost";
import Details from "./pages/Details";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-slate-200">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/details/:postId" element={<Details />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/edit/:postId" element={<EditPost />} />
          <Route path="/user/post" element={<AllPost />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
