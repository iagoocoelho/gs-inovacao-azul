import { Header } from "@/components/header";
import map from "@/assets/map.png";
import map_app from "@/assets/map_app.png";
import { useNavigate } from "react-router-dom";

const MyEquipments = () => {
  const navigate = useNavigate();

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

        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              navigate("/equipamento/reparo/1");
            }}
          >
            <img
              src={map_app}
              alt=""
              className="rounded-sm md:hidden max-w-[260px]"
            />
          </button>

          <button
            onClick={() => {
              navigate("/equipamento/reparo/1");
            }}
          >
            <img
              src={map}
              alt=""
              className="rounded-sm hidden md:block max-w-[1200px] h-auto"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyEquipments;
