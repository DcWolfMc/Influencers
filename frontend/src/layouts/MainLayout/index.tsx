import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export const MainLayout = () => {
  return (
    <div className="flex flex-1 flex-col items-center md:gap-16 gap-8">
      <Header />
      <main className=" flex-1 w-full max-w-[1280px]">
        <Outlet />
      </main>
    </div>
  );
};
