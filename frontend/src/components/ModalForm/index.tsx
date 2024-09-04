import { NewInfluencerData, InfluencerData } from "@/@types/influencerDataType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getCepInformation } from "@/service/api";
import { maskCEP } from "@/util/masks";
import { User } from "phosphor-react";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MultiSelect } from "../MultiSelect";
import Categories from "@/util/categories.json";
import { useBrands } from "@/context/BrandsContext";
import { AxiosError } from "axios";
import { NestErrorType } from "@/@types/errortypes";

interface ModalFormProps {
  onSubmitFunction: (data: any, id?: number) => Promise<void>;
  initialData?: InfluencerData;
  title: string;
  description: string;
  triggerText?: string;
  triggerClassName?: string;
  submitButtonText: string;
  icon?: ReactNode;
}
export const ModalForm: FunctionComponent<ModalFormProps> = ({
  description,
  onSubmitFunction,
  title,
  initialData,
  icon,
  triggerClassName,
  triggerText,
  submitButtonText,
}) => {
  const { brands } = useBrands();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm<NewInfluencerData & { cep: string }>();
  const cep = watch("cep");
  const image = watch("image");

  useEffect(() => {
    if (initialData) {
      // Transforma as categorias e marcas para arrays de strings
      const mappedData = {
        ...initialData,
        categories: initialData.categories?.map((category) => category.name),
        brands: initialData.brands?.map((brand) => brand.name),
      };

      // Seta os valores do formulário com o mappedData
      Object.keys(mappedData).forEach((key) => {
        setValue(key as keyof NewInfluencerData, (mappedData as any)[key]);
      });
    }
  }, [initialData, setValue]);

  const fetchCepInformation = async () => {
    await getCepInformation(cep).then((response) => {
      console.log(response);
      const newAddress = `${response.data.logradouro} - ${response.data.bairro}, ${response.data.localidade}, ${response.data.uf}`;
      setValue("address", newAddress);
    });
    console.log("procurando dados ao desfocar input de CEP.");
  };

  const onSubmit: SubmitHandler<NewInfluencerData & { cep: string }> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      const { cep, ...dataWithoutCep } = data;
      if (initialData) {
        await onSubmitFunction(
          {
            ...dataWithoutCep,
            followers: Number(dataWithoutCep.followers),
            following: Number(dataWithoutCep.following),
          },
          initialData.id
        ).then(() => {
          console.log("success");

          toast.success("Cadastro realizado com sucesso! \n", {
            onClose: () => {},
          });
          reset(); // Limpa os campos do formulário
          setIsOpen(false); // Fecha o modal
        });
      } else {
        await onSubmitFunction({
          ...dataWithoutCep,
          followers: Number(dataWithoutCep.followers),
          following: Number(dataWithoutCep.following),
          brands: dataWithoutCep.brands ? dataWithoutCep.brands : [""],
          categories: dataWithoutCep.categories
            ? dataWithoutCep.categories
            : [""],
        }).then(() => {
          console.log("success");

          toast.success("Cadastro realizado com sucesso! \n", {
            onClose: () => {},
          });
          reset(); // Limpa os campos do formulário
          setIsOpen(false); // Fecha o modal
        });
      }
    } catch (error) {
      const submitError = error as AxiosError<NestErrorType>;
      console.error("Submission error:", error);
      setFormError(
        submitError.response
          ? submitError.response.data.message
          : submitError.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoriesOptions = Categories.map((value) => {
    return { name: value, value: value };
  });
  let brandsOptions =
    brands?.map((value) => {
      return { name: value.name, value: value.name };
    }) || [];
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={`${triggerClassName}`}>
        {icon} {triggerText}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[80%] bg-slate-800 border-slate-500">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-4  justify-center items-center">
              <Avatar className="aspect-square w-40 h-auto border-4 border-orange-500 shadow-md bg-slate-700">
                <AvatarImage src={image} />
                <AvatarFallback className="bg-slate-300">
                  <User size={160} className="text-slate-700" />
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="image"
                className="flex flex-col gap-2 w-full max-w-[368px]"
              >
                <span className="font-bold">ImageURL: </span>
                <input
                  {...register("image", {})}
                  id="image"
                  className="p-2 rounded-md w-[368px] bg-slate-800 text-slate-100 border-2 border-slate-500"
                  type="text"
                  placeholder="Insira uma url válida para usar de foto"
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image?.message}</p>
                )}
              </label>
            </div>

            <div id="wrapper-right" className="flex flex-col gap-4">
              <div className="flex fex-row gap-4">
                <label
                  htmlFor="name"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Nome: </span>
                  <input
                    {...register("name", {
                      required: { value: true, message: "*Campo obrigatório" },
                      maxLength: 50,
                    })}
                    id="name"
                    className="p-2 rounded-md w-[368px] bg-slate-800 text-slate-100 border-2 border-slate-500"
                    type="text"
                    maxLength={50}
                    placeholder="Nome do Influenciador"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </label>
                <label
                  htmlFor="email"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Por favor, insira um e-mail válido",
                      },
                    })}
                    id="email"
                    className="p-2 rounded-md w-[368px] bg-slate-800 text-slate-100 border-2 border-slate-500"
                    type="email"
                    maxLength={50}
                    placeholder="Email do Influenciador"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                </label>
              </div>
              <div className="flex fex-row gap-4">
                <label
                  htmlFor="instagram_name"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Nome do Instagram: </span>
                  <input
                    {...register("instagram_name", {
                      onChange: (event) => {
                        const lowerCase: string = event.target.value as string;
                        event.target.value = lowerCase.toLowerCase();
                      },
                      required: { value: true, message: "*Campo obrigatório" },
                      maxLength: 20,
                    })}
                    id="instagram_name"
                    className="p-2 rounded-md w-[368px] bg-slate-800 text-slate-100 border-2 border-slate-500"
                    type="text"
                    maxLength={20}
                    placeholder="Nome do Instagram do Influenciador"
                  />
                  {errors.instagram_name && (
                    <p className="text-red-500">
                      {errors.instagram_name.message}
                    </p>
                  )}
                </label>
                <div className="flex fex-row gap-4 max-w-[368px]">
                  <label
                    htmlFor="seguidores"
                    className="flex-1 flex flex-col gap-2 w-full max-w-[176px]"
                  >
                    <span className="font-bold">Seguidores: </span>
                    <input
                      {...register("followers", {
                        required: {
                          value: true,
                          message: "*Campo obrigatório",
                        },
                        maxLength: 50,
                      })}
                      id="seguidores"
                      className="p-2 rounded-md bg-slate-800 text-slate-100 border-2 border-slate-500"
                      type="number"
                      maxLength={20}
                      placeholder="Número de seguidores"
                    />
                    {errors.followers && (
                      <p className="text-red-500">{errors.followers.message}</p>
                    )}
                  </label>
                  <label
                    htmlFor="following"
                    className="flex-1 flex flex-col gap-2 w-full max-w-[176px]"
                  >
                    <span className="font-bold">Seguindo: </span>
                    <input
                      {...register("following", {
                        required: {
                          value: true,
                          message: "*Campo obrigatório",
                        },
                        maxLength: 50,
                      })}
                      id="following"
                      className="p-2 rounded-md bg-slate-800 text-slate-100 border-2 border-slate-500"
                      type="number"
                      maxLength={20}
                      placeholder="Número de seguindos"
                    />
                    {errors.following && (
                      <p className="text-red-500">{errors.following.message}</p>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex fex-row gap-4">
                <label
                  htmlFor="cep"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Cep: </span>
                  <input
                    className="p-2 rounded-md bg-slate-800 text-slate-100 border-2 border-slate-500"
                    type="text"
                    placeholder="CEP"
                    {...register("cep", {
                      onChange: (event) => {
                        const { value } = event.target;
                        event.target.value = maskCEP(value);
                      },
                      onBlur: () => fetchCepInformation(),
                    })}
                    required
                  />
                  {errors.cep && (
                    <p className="text-red-500">{errors.cep.message}</p>
                  )}
                </label>
                <label
                  htmlFor="address"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Endereço: </span>
                  <input
                    {...register("address", {
                      required: { value: true, message: "*Campo obrigatório" },
                    })}
                    id="address"
                    className="p-2 rounded-md w-[368px] bg-slate-800 text-slate-100 border-2 border-slate-500 cursor-not-allowed"
                    type="text"
                    placeholder="Endereço do Influenciador"
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </label>
              </div>
              <div className="flex fex-row gap-4">
                <label
                  htmlFor="categories"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Categorias: </span>
                  <MultiSelect
                    name="categories"
                    control={control}
                    options={categoriesOptions}
                  />
                  {errors.categories && (
                    <p className="text-red-500">{errors.categories.message}</p>
                  )}
                </label>
                <label
                  htmlFor="brands"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Categorias: </span>
                  <MultiSelect
                    name="brands"
                    control={control}
                    options={brandsOptions}
                  />
                  {errors.brands && (
                    <p className="text-red-500">{errors.brands.message}</p>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="w-full text-red-500">
            <p>{formError}</p>
          </div>
          <button
            type="submit"
            className={`mt-[96px] p-2 rounded-md w-full max-w-[368px] font-bold self-center ${
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
              ` ${submitButtonText} `
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
