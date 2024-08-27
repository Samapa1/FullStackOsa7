import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { showUsers } from "../reducers/usersreducer";
import { initializeUser } from "../reducers/userreducer";

const UserObject = ({ user }) => {
  const blogs = user.blogs.length;
  if (user !== null) {
    return (
      <tbody>
        <tr>
          <Link to={`/users/${user.id}`}>
            <td>{user.name}</td>
          </Link>
          <td>{blogs}</td>
        </tr>
      </tbody>
    );
  }
};

const Userlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUsers());
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const listUsers = useSelector((state) => state.users);

  if (listUsers !== null) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th> </th>
              <th>blogs created</th>
            </tr>
          </tbody>
          {listUsers.map((user) => (
            <UserObject key={user.id} user={user} />
          ))}
        </table>
      </div>
    );
  }
};
export default Userlist;
