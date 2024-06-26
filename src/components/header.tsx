import { Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { FC } from "react";
import icon from "@/assets/icon_white.svg";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 bg-transparent border-none md:z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="text-white font-semibold text-2xl flex space-x-4">
          <img src={icon} alt="" />
          <h1>EcoDrain</h1>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base hover:opacity-70 opacity-100 transition-opacity text-white"
        >
          <Package2 className="h-6 w-6" />
          <span>Home</span>
        </Link>

        <Link
          to="/resgates"
          className="flex items-center gap-2 text-lg font-semibold md:text-base hover:opacity-70 opacity-100 transition-opacity text-white"
        >
          Resgate de benefícios
        </Link>

        <Link
          to="/equipamentos"
          className="flex items-center gap-2 text-lg font-semibold md:text-base hover:opacity-70 opacity-100 transition-opacity text-white"
        >
          Meus Equipamentos
        </Link>
      </nav>

      {/* MOBILE MENU */}
      <Sheet>
        <div className="text-white font-semibold text-2xl flex space-x-4 md:hidden">
          <img src={icon} alt="" />
          <h1>EcoDrain</h1>
        </div>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden right-0 absolute mr-4 z-10"
          >
            <Menu className="h-7 w-7 text-white" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <Link
              to="/resgates"
              className="text-muted-foreground hover:text-foreground"
            >
              Resgate de benefícios
            </Link>

            <Link
              to="/equipamentos"
              className="text-muted-foreground hover:text-foreground"
            >
              Meus Equipamentos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
