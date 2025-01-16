import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div id="loader">Loading...</div>;
  }

  return (
    <div>
      <h1 id="pageTitle">Users Page</h1>
      <h2>Users</h2>
      <ul id="userList">
        {users.map((user) => (
          <li key={user.id}>
            <h3>
              <Link className="userName" to={`/users/${user.id}`}>{user.name}</Link>
            </h3>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
