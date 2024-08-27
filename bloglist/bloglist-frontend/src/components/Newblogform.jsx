import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogreducer.js";
import { setNotification } from "../reducers/notificationreducer";
import { Button, Input } from "./Styles.jsx";

const Newblogform = () => {
  const dispatch = useDispatch();

  const addBlogToDB = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    event.target.title.value = "";
    const author = event.target.author.value;
    event.target.author.value = "";
    const url = event.target.url.value;
    event.target.url.value = "";

    try {
      await dispatch(
        createNewBlog({
          author: author,
          title: title,
          url: url,
        }),
      );

      dispatch(
        setNotification(
          {
            data: `${title} by ${author} added`,
            type: "info",
          },
          3000,
        ),
      );
    } catch (exception) {
      console.log(exception);
      dispatch(
        setNotification(
          { data: "adding of the blog failed", type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlogToDB}>
        <div>
          title
          <Input name="title" />
        </div>
        <div>
          author
          <Input name="author" />
        </div>
        <div>
          url
          <Input name="url" />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  );
};

export default Newblogform;
