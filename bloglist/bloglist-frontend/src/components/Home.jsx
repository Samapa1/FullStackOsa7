import { useRef } from "react";
import { useSelector } from "react-redux";
import Bloglist from "./Bloglist";
import Togglable from "./Togglable";
import Newblogform from "./Newblogform";
import LoginForm from "./Loginform";

const Home = () => {
  const blogFormRef = useRef();

  const user = useSelector((state) => state.user);

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <Newblogform />
        </Togglable>
        <br></br>
      </div>
      <Bloglist />
    </div>
  );
};

export default Home;
