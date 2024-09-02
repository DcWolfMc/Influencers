import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import Logo from "../../assets/logo.svg";
export const AuthLayout = () => {
  return (
    <div className=" h-lvh flex flex-1 flex-row items-center justify-center gap-16">
      <main className="mt-40 flex flex-col justify-start items-center flex-1 h-full w-full max-w-[720px] gap-8">
        <img src={Logo} alt="" />
        <Outlet />
      </main>
    </div>
  );
};