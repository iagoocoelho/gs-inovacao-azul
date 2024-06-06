
import Home from "@/pages/home";
import RegisterEquipment from "@/pages/registerEquipment";
import RepairEquipment from "@/pages/repairEquipment";
// import UserForm from "@/pages/users";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/equipment/register"} element={<RegisterEquipment />} />
        <Route path={"/equipment/repair/:id"} element={<RepairEquipment />} />
        {/* <Route path={"/user"} element={<UserForm />} /> */}
        <Route path={"/*"} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Routers;
