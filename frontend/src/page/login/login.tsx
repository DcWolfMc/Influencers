import { Link } from "react-router-dom";

export const Login = () => {
  function handleSubmit() {
    
  }
  return (
    <div className="p-8 flex flex-col bg-slate-500 rounded-md gap-8 shadow-md">
      <strong className="text-xl">Entrar</strong>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8">
        <label htmlFor="email" className="flex flex-col gap-2">
          <span className="font-bold">Email: </span>
          <input
            id="email"
            className="p-2 rounded-md w-[416px] bg-slate-700 text-slate-100 border-2 border-transparent"
            type="email"
            placeholder="Digite seu E-mail"
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-2">
          <span className="font-bold">Senha: </span>
          <input
            id="password"
            className="p-2 rounded-md w-[416px] bg-slate-700 text-slate-100 border-2 border-transparent"
            type="password"
            placeholder="Digite sua Senha"
          />
          <Link
            to={""}
            className=" w-full text-orange-500 hover:text-orange-600 text-right"
          >
            Esqueci a senha?
          </Link>
        </label>
        <section className="space-y-4">
          <button
            type="submit"
            className="p-2 rounded-md w-[416px] font-bold bg-orange-500 hover:bg-orange-600 text-slate-100 border-2 border-transparent"
          >
            {" "}
            Entrar
          </button>
          <div className="flex flex-row justify-start gap-1">
            <span>Cadastre um usuário </span>{" "}
            <Link
              className="text-orange-500 font-bold hover:text-orange-600"
              to={"/signUp"}
            >
              {" "}
              aqui
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};
