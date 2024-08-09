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

const App = () => {
  const padding = {
    padding: 5,
  };

  // const menuStyle = {
  //   backgroundColor: "lightgrey",
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("initializeUser");
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    console.log("initializeBlogs");
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    console.log("ishowUsers");
    dispatch(showUsers());
  }, []);

  const users = useSelector((state) => state.users);
  console.log(users);

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

  console.log("rendering");

  return (
    <Page>
      <>
        {/* <div style={menuStyle}> */}
        <Navigation>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user ? (
            <>
              <em>{user.name} logged in </em>
              <Logout />
            </>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </Navigation>
        {/* </div> */}
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

// import users from "./services/users";

// const ListUser = ({ user }) => {
//   const blogs = user.blogs.length;
//   console.log(blogs);
//   if (user !== null) {
//     return (
//       <div>
//         <Link to={`/users/${user.id}`}>{user.name}</Link> {blogs}
//       </div>
//     );
//   }
// };

// const Userlist = () => (
//   <div>
//     <h2>Users</h2>
//     {users.map((user) => (
//       <ListUser key={user.id} ListUser={user} />
//     ))}
//   </div>
// );
