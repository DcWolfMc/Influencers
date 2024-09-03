import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { signUp } from "@/service/api";
import { toast } from 'react-toastify';

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      await signUp(data).then(response=>{
        console.log("signUp response", response);
        toast.success('Cadastro realizado com sucesso!');
      }) // Simulate form submission
      // Implement your submission logic here (e.g., API call)
    } catch (error) {
      console.error("Submission error:", error);
      toast.error('Ocorreu um erro ao realizar o cadastro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 flex flex-col bg-slate-600 rounded-md gap-8 shadow-md">
      <strong className="text-xl">Cadastro</strong>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <label
          htmlFor="name"
          className="flex flex-col gap-2 w-full max-w-[416px]"
        >
          <span className="font-bold">Nome: </span>
          <input
            {...register("name", {
              required: { value: true, message: "*Campo obrigatório" },
              maxLength: 20,
            })}
            id="name"
            className="p-2 rounded-md w-[416px] bg-slate-800 text-slate-100 border-2 border-transparent"
            type="text"
            maxLength={20}
            placeholder="Digite seu Nome"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>
        <label
          htmlFor="email"
          className="flex flex-col gap-2 w-full max-w-[416px]"
        >
          <span className="font-bold">Email: </span>
          <input
            {...register("email", {
              required: { value: true, message: "*Campo obrigatório" },
              maxLength: {
                value: 50,
                message: "O campo deve ter no máximo 50 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Por favor, insira um e-mail válido",
              },
            })}
            id="email"
            className="p-2 rounded-md w-[416px] bg-slate-800 text-slate-100 border-2 border-transparent"
            type="email"
            placeholder="Digite seu E-mail"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>
        <label
          htmlFor="password"
          className="flex flex-col gap-2 w-full max-w-[416px]"
        >
          <span className="font-bold">Senha: </span>
          <input
            {...register("password", {
              required: { value: true, message: "*Campo obrigatório" },
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  "A senha deve ter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas e números",
              },
            })}
            id="password"
            className="p-2 rounded-md w-[416px] bg-slate-800 text-slate-100 border-2 border-transparent"
            type="password"
            placeholder="Digite sua Senha"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>
        <section className="space-y-4">
          <button
            type="submit"
            className={`p-2 rounded-md w-full max-w-[416px] font-bold ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-slate-100 border-2 border-transparent flex items-center justify-center`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin text-slate-100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4V1M12 23v-3M21 12h3M1 12h3M17.657 6.343l2.121-2.121M4.221 19.779l2.121-2.121M17.657 17.657l2.121 2.121M4.221 4.221l2.121 2.121"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              "Cadastrar"
            )}
          </button>
          <div className="flex flex-row justify-start gap-1">
            <span>Já possui um acesso? </span>
            <Link
              className="text-orange-500 font-bold hover:text-orange-600"
              to={"/"}
            >
              Click aqui
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};
