import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BlogObject = ({ className, blog }) => {
  return (
    <div className={className}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

const StyledBlogObject = styled(BlogObject)`
  background: #f6e0bf;
  font-size: 1em;
  margin: 0.5em 0.1em;
  padding: 0.25em 0.75em;
  border: none;
  border-radius: 3px;
`;

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <StyledBlogObject key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
