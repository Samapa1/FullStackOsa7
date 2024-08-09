import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const styleobj = {
  marginLeft: 150,
  fontWeight: "bold",
};

const UserObject = ({ user }) => {
  const blogs = user.blogs.length;
  console.log(blogs);
  if (user !== null) {
    return (
      <tbody>
        <tr>
          <Link to={`/users/${user.id}`}>
            <td>{user.name}</td>
          </Link>
          {/* <p style={{ marginLeft: 150 }}>{blogs}</p> */}
          <td>{blogs}</td>
          {/* <p style>{blogs}</p> */}
        </tr>
      </tbody>
    );
  }
};

const Userlist = () => {
  const listUsers = useSelector((state) => state.users);
  if (listUsers !== null) {
    return (
      <div>
        {/* <div>
        <p>{user2.name} logged in</p>
      </div> */}
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
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

// import { showUsers } from "../reducers/usersreducer";
// import { initializeUser } from "../reducers/userreducer";

// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(initializeUser());
// }, []);

// useEffect(() => {
//   dispatch(showUsers());
// }, []);
