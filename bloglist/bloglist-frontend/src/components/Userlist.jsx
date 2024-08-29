import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { showUsers } from "../reducers/usersreducer";
import { initializeUser } from "../reducers/userreducer";

const UserObject = ({ user }) => {
  const blogs = user.blogs.length;
  if (user !== null) {
    return (
      <tr>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{blogs}</td>
      </tr>
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
            {listUsers.map((user) => (
              <UserObject key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
export default Userlist;
