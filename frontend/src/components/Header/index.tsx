import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import LogoMini from "@/assets/logo-mini.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretDown, User } from "phosphor-react";
import { useAuth } from "@/context/AuthContext";
import useWindowDimensions from "@/util/getWindowDimensions";

export const Header = () => {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const {width} = useWindowDimensions()

  const routes = [
    { path: "/influencers", name: "Influenciadores" },
    { path: "/brands", name: "Marcas" },
  ];

  return (
    <header className="flex flex-row w-full py-4 px-8 justify-between items-center bg-slate-500 shadow-sm">
      <img src={Logo} alt="" className="md:block hidden" />
      <img src={LogoMini} alt="" className="md:hidden block" />

      <nav className="flex flex-1 w-full max-w-[1280px] items-center justify-end md:gap-8 gap-4">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`${
              location.pathname.includes(route.path)
                ? " border-b-4 border-orange-500 font-bold"
                : "border-b-4 border-transparent hover:border-orange-500 font-bold"
            }`}
          >
            {route.name}
          </Link>
        ))}
        <Popover>
          <PopoverTrigger className="px-2 py-1 flex flex-row items-center gap-2 hover:bg-slate-400 rounded">
            <div className="xs:p-0 p-1 xs:border-0 border-2 rounded-full">
              <User weight="bold"/>
            </div>
            {width >= 425?(

              <>
              {userData?.name}
            <div>
              <CaretDown weight={"bold"} />
            </div>
              </>
            ):null
            }
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 bg-slate-600 border-0 text-slate-100">
            <strong className="text-center">User Data</strong>
            <div className="flex flex-row gap-2">
              <span>Id:</span>
              <span>{userData?.id}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span>Nome:</span>
              <span>{userData?.name}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span>email:</span>
              <span>{userData?.email}</span>
            </div>
            <button
              className="mt-4 w-full flex flex-row p-2 rounded border border-orange-500 hover:bg-orange-500 items-center justify-center transition-colors"
              onClick={logout}
            >
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </nav>
    </header>
  );
};
