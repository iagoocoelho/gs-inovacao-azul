import { Header } from "@/components/header";
import map from "@/assets/map.png";
import map_app from "@/assets/map_app.png";

const MyEquipments = () => {
  return (
    <>
      <Header />

      <div className="p-5 rounded-2xl backdrop-blur-md backdrop-brightness-75">
        <div className="flex flex-col space-y-2 mb-3">
          <h1 className="text-3xl font-bold text-white text-center">
            Equipamentos
          </h1>
          <p className="text-white font-semibold text-base text-center">
            Localize seus equipamentos
          </p>
        </div>

        <div>
          <img src={map_app} alt="" className="rounded-sm" />
        </div>
      </div>
    </>
  );
};

export default MyEquipments;
