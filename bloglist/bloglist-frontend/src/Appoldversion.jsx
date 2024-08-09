import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Newblogform from "./components/Newblogform";
import LoginForm from "./components/Loginform";
import { initializeBlogs } from "./reducers/blogreducer";
import { initializeUser } from "./reducers/userreducer";
import { removeUser } from "./reducers/userreducer";
// import { showUsers } from "./reducers/usersreducer";
import { setNotification } from "./reducers/notificationreducer";

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const user = useSelector((state) => state.user);

  const logOut = () => {
    dispatch(removeUser());
    dispatch(setNotification({ data: "logged out", type: "info" }, 3000));
  };

  // useEffect(() => {
  //   dispatch(showUsers());
  // }, []);
  // const users = useSelector((state) => state.users);
  // console.log(users);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>
          {user.name} logged in <button onClick={logOut}>log out</button>
        </p>
      </div>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <Newblogform />
        </Togglable>
        <br></br>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // user={user}
          // likeBlog={likeBlog}
          // removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;

// old stuff

// const handleNotification = (notification) => {
//   dispatch(setNotification(notification));
//   setTimeout(() => {
//     dispatch(removeNotification());
//   }, 3000);
// };
// const createBlog = async (blogObject) => {
//   blogFormRef.current.toggleVisibility();
//   try {
//     const data = await blogService.create(blogObject);
//     dispatch(createNewBlog(data));
//     handleNotification({
//       data: `${data.title} by ${data.author} added`,
//       type: "info",
//     });
//   } catch (exception) {
//     console.log(exception);
//     handleNotification({ data: "adding of the blog failed", type: "error" });
//   }
// };

// const likeBlog = async (blogObject) => {
//   const data = await blogService.update(blogObject);
//   console.log(data);
//   dispatch(likeBlogAction(data));
// };

// const removeBlog = async (id) => {
//   if (
//     window.confirm(
//       `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${blogs.find((blog) => blog.id === id).author}`,
//     )
//   ) {
//     await blogService.remove(id);
//     dispatch(removeBlogAction(id));
//     handleNotification({ data: "Blog deleted!", type: "info" });
//   }
// };

// useEffect(() => {
//   blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
// }, []);
