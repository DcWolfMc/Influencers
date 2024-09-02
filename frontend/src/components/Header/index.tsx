import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export const Header = () => {
  const location = useLocation();

  const routes = [
    { path: "/influencers", name: "Influenciadores" },
    { path: "/brands", name: "Marcas" },
  ];

  return (
    <header className="flex flex-row w-full py-4 px-8 justify-between items-center bg-slate-500 shadow-sm">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <nav className="flex flex-1 w-full max-w-[1280px] items-center justify-end gap-8">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`${
              location.pathname === route.path
                ? " border-b-4 border-customAmber font-bold"
                : "border-b-4 border-transparent hover:border-customAmber font-bold"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};
