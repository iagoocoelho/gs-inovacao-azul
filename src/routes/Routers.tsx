
import Home from "@/pages/home";
import RegisterEquipment from "@/pages/registerEquipment";
import RepairEquipment from "@/pages/repairEquipment";
import Rewards from "@/pages/rewards";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/equipment/register"} element={<RegisterEquipment />} />
        <Route path={"/equipment/repair/:id"} element={<RepairEquipment />} />
        <Route path={"/rewards"} element={<Rewards />} />
        <Route path={"/*"} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Routers;
