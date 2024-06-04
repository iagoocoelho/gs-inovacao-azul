import Equipment from "@/pages/equipment";
import Home from "@/pages/home";
import UserForm from "@/pages/users";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/equipment/:id"} element={<Equipment />} />
        <Route path={"/user"} element={<UserForm />} />
        <Route path={"/*"} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Routers;
