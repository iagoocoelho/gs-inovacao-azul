/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/header";

import { Container } from "@/components/ui/container";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import game from "@/assets/games.png";
import nootbook from "@/assets/nootbook.png";
import smartphone from "@/assets/smartphone.png";
import hardware from "@/assets/hardware.png";
import logitech from "@/assets/logitech.png";
import vans from "@/assets/vans.png";
import nike from "@/assets/nike.png";
import zattini from "@/assets/zattini.png";
import tim from "@/assets/tim.png";
import uber from "@/assets/uber.png";
import ifood from "@/assets/ifood.png";
import play from "@/assets/play.png";
import googleplay from "@/assets/googleplay.png";

const Rewards = () => {
  const { toast } = useToast();

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold text-white text-center">
          Resgate de Benefícios
        </h1>

        <div className="mt-8">
          <Button variant="seaBtn">Meus Resgates</Button>
          <Badge variant="outline">R$ 0,00</Badge>
        </div>

        <div className="pt-4">
          <h2 className="text-white font-bold pb-3">Desconto em produtos</h2>
          <Carousel
            className="w-full max-w-sm md:max-w-none"
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent className="-ml-1">
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] sm:basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center flex-col bg-transparent p-1">
                      <img src={game} alt="games" />
                      <span className="text-sm font-bold text-black">
                        10% off
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] sm:basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center flex-col bg-transparent p-1">
                      <img src={nootbook} alt="nootbook" />
                      <span className="text-sm font-bold text-black">
                        20% off
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] sm:basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center flex-col bg-transparent p-1">
                      <img src={smartphone} alt="smartphone" />
                      <span className="text-sm font-bold text-black">
                        13% off
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] sm:basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center flex-col bg-transparent p-1">
                      <img src={hardware} alt="hardware" />
                      <span className="text-sm font-bold text-black">
                        32% off
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="text-white font-bold">Desconto em marcas</h2>
          <Carousel className="w-full max-w-sm md:max-w-none">
            <CarouselContent className="-ml-1">
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[50%] sm:basis-full">
                <div className="p-1">
                  <Card className="bg-transparent border-none">
                    <CardContent className="flex aspect-square items-center justify-evenly flex-col bg-transparent p-1">
                      <img src={logitech} alt="logitech" />

                      <div className="max-h-[40px] text-center">
                        <p className="text-sm font-bold text-white">Logitech</p>
                        <p className="text-sm font-bold text-white">10% off</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[50%] sm:basis-full">
                <div className="p-1">
                  <Card className="bg-transparent border-none">
                    <CardContent className="flex aspect-square items-center justify-evenly flex-col bg-transparent p-1">
                      <img src={vans} alt="vans" className="rounded" />
                      <div className="max-h-[40px] text-center">
                        <p className="text-sm font-bold text-white">Vans</p>
                        <p className="text-sm font-bold text-white">15% off</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[50%] sm:basis-full">
                <div className="p-1">
                  <Card className="bg-transparent border-none">
                    <CardContent className="flex aspect-square items-center justify-evenly flex-col bg-transparent p-1">
                      <img src={nike} alt="nike" className="rounded" />
                      <div className="max-h-[40px] text-center">
                        <p className="text-sm font-bold text-white">Nike</p>
                        <p className="text-sm font-bold text-white">12% off</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[50%] sm:basis-full">
                <div className="p-1">
                  <Card className="bg-transparent border-none">
                    <CardContent className="flex aspect-square items-center justify-evenly flex-col bg-transparent p-1">
                      <img src={tim} alt="tim" className="rounded" />
                      <div className="max-h-[40px] text-center">
                        <p className="text-sm font-bold text-white">Tim</p>
                        <p className="text-sm font-bold text-white">50% off</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[50%] sm:basis-full">
                <div className="p-1">
                  <Card className="bg-transparent border-none">
                    <CardContent className="flex aspect-square items-center justify-evenly flex-col bg-transparent p-1">
                      <img src={zattini} alt="zattini" className="rounded" />
                      <div className="max-h-[40px] text-center">
                        <p className="text-sm font-bold text-white">Zattini</p>
                        <p className="text-sm font-bold text-white">32% off</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <Separator className="my-6" />

        <div className="pt-4">
          <h2 className="text-white font-bold pb-3">Gift Cards</h2>
          <Carousel
            className="w-full max-w-sm md:max-w-none"
            // plugins={[
            //   Autoplay({
            //     delay: 3000,
            //   }),
            // ]}
          >
            <CarouselContent className="-ml-1">
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] min-w-[200px] sm:basis-full">
                <div className="p-1">
                  <Card className="rounded-lg border-none">
                    <CardContent className="flex flex-col bg-transparent p-0">
                      <div className="flex relative items-center">
                        <div className="w-[60px] h-[100px] bg-[#5f5fe3] border-r-2 rounded-r-lg rounded-l-lg"></div>

                        <div className="w-full pr-5 relative top-[2px]">
                          <p className="text-lg font-bold text-[#5f5fe3] p-0 text-center leading-3 pl-12">
                            <span className="text-2xl">8%</span> de
                            <br />
                            <span>desconto</span>
                          </p>
                        </div>

                        <div className="w-full h-full flex items-center absolute top-0 left-5 pointer-events-none">
                          <img
                            src={uber}
                            alt="uber"
                            className="max-w-[60px] rounded-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] min-w-[200px] sm:basis-full">
                <div className="p-1">
                  <Card className="rounded-lg border-none">
                    <CardContent className="flex flex-col bg-transparent p-0">
                      <div className="flex relative items-center">
                        <div className="w-[60px] h-[100px] bg-[#5f5fe3] border-r-2 rounded-r-lg rounded-l-lg"></div>

                        <div className="w-full pr-5 relative top-[2px]">
                          <p className="text-lg font-bold text-[#5f5fe3] p-0 text-center leading-3 pl-12">
                            <span className="text-2xl">5%</span> de
                            <br />
                            <span>desconto</span>
                          </p>
                        </div>

                        <div className="w-full h-full flex items-center absolute top-0 left-5 pointer-events-none">
                          <img
                            src={ifood}
                            alt="ifood"
                            className="max-w-[60px] rounded-md"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 basis-[80%] min-w-[200px] sm:basis-full">
                <div className="p-1">
                  <Card className="rounded-lg border-none">
                    <CardContent className="flex flex-col bg-transparent p-0">
                      <div className="flex relative items-center">
                        <div className="w-[60px] h-[100px] bg-[#5f5fe3] border-r-2 rounded-r-lg rounded-l-lg"></div>

                        <div className="w-full pr-5 relative top-[2px]">
                          <p className="text-lg font-bold text-[#5f5fe3] p-0 text-center leading-3 pl-12">
                            <span className="text-2xl">3%</span> de
                            <br />
                            <span>desconto</span>
                          </p>
                        </div>

                        <div className="w-full h-full flex items-center absolute top-0 left-5 pointer-events-none">
                          <img
                            src={play}
                            alt="play"
                            className="max-w-[60px] rounded-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 min-w-[200px] sm:basis-full">
                <div className="p-1">
                  <Card className="rounded-lg border-none">
                    <CardContent className="flex flex-col bg-transparent p-0">
                      <div className="flex relative items-center">
                        <div className="w-[60px] h-[100px] bg-[#5f5fe3] border-r-2 rounded-r-lg rounded-l-lg"></div>

                        <div className="w-full pr-5 relative top-[2px]">
                          <p className="text-lg font-bold text-[#5f5fe3] p-0 text-center leading-3 pl-12">
                            <span className="text-2xl">4%</span> de
                            <br />
                            <span>desconto</span>
                          </p>
                        </div>

                        <div className="w-full h-full flex items-center absolute top-0 left-5 pointer-events-none">
                          <img
                            src={googleplay}
                            alt="googleplay"
                            className="max-w-[60px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Container>
    </>
  );
};

export default Rewards;
