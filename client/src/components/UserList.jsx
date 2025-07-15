import { useEffect, useState } from "react";

function UserList({ onSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.users);
      });
  }, []);

  return (
    <div className=" md:w-[200px] border-r p-2 md:p-4 ">
      <h2 className="text-xl font-bold mb-5 ">Users</h2>
      <ul>
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => onSelect(u)}
            className="p-2 hover:bg-gray-100 cursor-pointer border-1 rounded mb-2 bg-"
          >
            {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
