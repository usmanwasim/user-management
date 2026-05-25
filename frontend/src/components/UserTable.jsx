const UserTable = ({ users, onToggle, order, setOrder }) => {
  return (
    <div className="table-wrapper">
      <table width="100%">
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setOrder(order === "ASC" ? "DESC" : "ASC");
              }}
            >
              Age {order === "ASC" ? "↑" : "↓"}
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>

              <td>{user.is_active ? "Active" : "Inactive"}</td>

              <td>
                <button
                  onClick={() => onToggle(user.id)}
                  style={{
                    padding: "2px 10px",
                  }}
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
