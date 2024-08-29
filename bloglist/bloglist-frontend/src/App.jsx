import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Userlist from "./components/Userlist";
import User from "./components/User";
import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Logout from "./components/Logout";
import { initializeUser } from "./reducers/userreducer";
import { showUsers } from "./reducers/usersreducer";
import { initializeBlogs } from "./reducers/blogreducer";
import { Navigation, Page } from "./components/Styles.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const padding = {
    padding: 5,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(showUsers());
  }, []);

  const users = useSelector((state) => state.users);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const matchuser = useMatch("/users/:id");
  const foundUser = matchuser
    ? users.find((user) => user.id === matchuser.params.id)
    : null;

  const matcblog = useMatch("/blogs/:id");
  const foundBlog = matcblog
    ? blogs.find((blog) => blog.id === matcblog.params.id)
    : null;

  return (
    <Page>
      <>
        <Navigation>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user ? (
            <>
              <span>{user.name} logged in </span>
              <Logout />
            </>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </Navigation>
        <br></br>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User user={foundUser} />} />
          <Route path="/blogs/:id" element={<Blog blog={foundBlog} />} />
          <Route
            path="/users"
            element={user ? <Userlist /> : <Navigate replace to="/login" />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginform />} />
        </Routes>
      </>
    </Page>
  );
};

export default App;
