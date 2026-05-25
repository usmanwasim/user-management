import { useEffect, useRef, useState } from "react";

import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { getUsers, toggleUserStatus } from "../services/user.service";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("ASC");
  const abortRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  const fetchUsers = async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await getUsers(
        page,
        debouncedEmail,
        order,
        controller.signal,
      );

      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      if (err.name === "AbortError") return;
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [page, debouncedEmail, order]);

  const handleToggle = async (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u)),
    );

    try {
      await toggleUserStatus(id);
    } catch (e) {
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management System</h1>

      <SearchBar email={email} setEmail={setEmail} />

      <UserTable
        users={users}
        onToggle={handleToggle}
        order={order}
        setOrder={setOrder}
      />

      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
};

export default Home;
