
import Home from "@/pages/home";
import MyEquipments from "@/pages/myEquipments";
import RegisterEquipment from "@/pages/registerEquipment";
import RepairEquipment from "@/pages/repairEquipment";
import Rewards from "@/pages/rewards";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/equipamento/registro"} element={<RegisterEquipment />} />
        <Route path={"/equipamento/reparo/:id"} element={<RepairEquipment />} />
        <Route path={"/resgates"} element={<Rewards />} />
        <Route path={"/equipamentos"} element={<MyEquipments />} />
        <Route path={"/*"} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Routers;
