import { Header } from "@/components/header";
import { Container } from "@/components/ui/container";
import qrcode from "@/assets/qrcode.png";

const Home = () => {
  return (
    <>
      <Header />

      <Container>
        <div className="flex flex-col items-center justify-between h-full">
          <h1 className="text-4xl font-bold text-white text-center">
            The future is now!
          </h1>

          <img src={qrcode} alt="" className="w-[130px]" />

          <p className="text-white font-semibold text-2xl text-center">
            Cadastre agora um equipamento EcoDrain e faça sua parte para a
            economia azul!
          </p>
        </div>
      </Container>
    </>
  );
};

export default Home;
