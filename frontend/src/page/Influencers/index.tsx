import { IconButton } from "@/components/IconButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, Funnel, Trash, Plus } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInfluencer } from "@/context/InfluencersContext";
import { formatNumber } from "@/util/formatter";
import { ModalForm } from "@/components/ModalForm";
import { CustomPopover } from "@/components/CustomPopover";
import { useForm } from "react-hook-form";
import { MultiSelect } from "@/components/MultiSelect";
import Categories from "@/util/categories.json";
export const Influencers = () => {
  const {
    fetchInfluencers,
    influencers,
    setSelectedInfluencer,
    influencersData,
    handleDeleteInfluencerById,
    createInfluencer,
  } = useInfluencer();
  const { accessToken, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLimit = searchParams.get("pageSize") || "10";
  const categories = searchParams.get("categories") || null;
  const categoriesArray = typeof categories  == "string"? categories.split(","): []
  const brands = searchParams.get("brands") || null;
  // const brandsArray = typeof brands  == "string"?brands.split(","):[]
  const currentPage = searchParams.get("page") || "1";
  const navigate = useNavigate();
  const {control, formState: { errors }, getValues } = useForm<{categories:"", brands:""}>()

  const categoriesOptions = Categories.map((value) => {
    return { name: value, value: value };
  });
  function handleNavigateDetails(id: number) {
    setSelectedInfluencer(
      influencers.filter((influencer) => influencer.id === id)[0]
    );
    navigate(`./${id}`);
  }
  const handleFilters = () => {
    const selectedCategories = getValues('categories') || [];
    const selectedBrands = getValues('brands') || [];
  
    // Atualize a URL com as categorias e marcas selecionadas
    if (selectedCategories.length > 0) {
      searchParams.set("categories", selectedCategories.join(","));
    } else {
      searchParams.delete("categories");
    }
  
    if (selectedBrands.length > 0) {
      searchParams.set("brands", selectedBrands.join(","));
    } else {
      searchParams.delete("brands");
    }
  
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchData() {
      if (!loading) {
        try {
          console.log("categories on fetch", categories, typeof categories);
          
          await fetchInfluencers(
            {
              brands: brands ||"",
              categories: categories ||"",
              page: currentPage,
              pageSize: currentLimit,
            },
            accessToken ? accessToken : ""
          );
        } catch (error) {
          console.error("Failed to fetch influencers", error);
        } finally {
        }
      }
    }
    fetchData();
  }, [currentPage, currentLimit, categories, brands, loading, accessToken]);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <section className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4">
          <CustomPopover
            icon={<Funnel size={20} weight="fill" />}
            triggerText="Filtro"
            triggerClassName="px-4 py-2 flex flex-row items-center gap-2 hover:bg-slate-400 rounded border border-slate-500"
          >
            {(closePopover) => (
              <div className="flex flex-col gap-4 items-center">
                <span>Ainda não implementado</span>
                <label
                  htmlFor="categories"
                  className="flex flex-col gap-2 w-full max-w-[368px]"
                >
                  <span className="font-bold">Categorias: </span>
                  <MultiSelect
                    name="categories"
                    control={control}
                    options={categoriesOptions}
                    defaultValues={categoriesArray}
                  />
                  {errors.categories && (
                    <p className="text-red-500">{errors.categories.message}</p>
                  )}
                </label>
                <button
                  className="w-full px-2 py-1 border-2 rounded border-orange-500 bg-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-colors"
                  onClick={() => {
                    handleFilters()
                    closePopover(); // Fecha o popover
                  }}
                >
                  Fechar
                </button>
              </div>
            )}
          </CustomPopover>
        </div>
        <ModalForm
          triggerClassName="px-4 py-2 flex flex-row items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 rounded"
          triggerText="Influencer"
          description="Preencha os campos abaixo para cadastrar um novo influenciador."
          title="Cadastrar Influencer"
          submitButtonText="Cadastrar"
          onSubmitFunction={createInfluencer}
          icon={<Plus size={20} weight="bold" />}
        />
      </section>
      <Table className="max-w-[960px]">
        <TableHeader>
          <TableRow className="border-orange-500">
            <TableHead className="w-[128px]">#id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Instagram</TableHead>
            <TableHead>Seguidores</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: influencersData.pageSize }, (_, index) => (
                <TableRow key={index}>
                  <TableCell className="p-0 pt-2" colSpan={6} width={"100%"}>
                    <Skeleton className="w-full h-[61px] border-b border-orange-500 rounded-sm" />
                  </TableCell>
                </TableRow>
              ))
            : influencersData.influencers.map((influencer) => (
                <TableRow
                  key={influencer.id}
                  className="even:bg-slate-600 border-orange-500"
                >
                  <TableCell className="font-medium">{influencer.id}</TableCell>
                  <TableCell className="w-full flex-1">
                    {influencer.name}
                  </TableCell>
                  <TableCell>{influencer.email}</TableCell>
                  <TableCell>{influencer.instagram_name}</TableCell>
                  <TableCell className="">
                    {formatNumber(influencer.followers)}
                  </TableCell>
                  <TableCell
                    id="actions"
                    className="flex flex-row max-w-[240px] gap-4"
                  >
                    <IconButton
                      icon={File}
                      iconProps={{ size: 20, weight: "bold" }}
                      onClick={() => handleNavigateDetails(influencer.id)}
                    />
                    {/* <IconButton
                      icon={NotePencil}
                      iconProps={{ size: 20, weight: "bold" }}
                    /> */}

                    <CustomPopover
                      icon={
                        <Trash
                          size={20}
                          weight="bold"
                          className="transition-colors text-orange-500 group-hover:text-orange-600"
                        />
                      }
                      triggerClassName="group flex flex-row items-center justify-center p-[4px] aspect-square min-h-11 rounded-lg border border-transparent bg-transparent hover:bg-slate-500/30"
                    >
                      {(closePopover) => (
                        <div className="space-y-4">
                          <span>Deseja deletar esse usuário?</span>
                          <div className="flex flex-row gap-4 justify-end">
                            <button
                              className="px-2 py-1 border-2 rounded border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 transition-colors"
                              onClick={() => {
                                handleDeleteInfluencerById(
                                  influencer.id.toString()
                                );
                                closePopover(); // Fecha o popover
                              }}
                            >
                              Sim
                            </button>
                            <button
                              className="px-2 py-1 border-2 rounded border-slate-500/30 hover:bg-slate-500/30 transition-colors"
                              onClick={closePopover}
                            >
                              Não
                            </button>
                          </div>
                        </div>
                      )}
                    </CustomPopover>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <Pagination totalOfItems={influencersData.totalCount} />
    </div>
  );
};
