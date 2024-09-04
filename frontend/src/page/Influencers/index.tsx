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
import { File, Funnel, NotePencil, Trash } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInfluencer } from "@/context/InfluencersContext";
import { formatNumber } from "@/util/formatter";
import { ModalForm } from "@/components/ModalForm";
import { CustomPopover } from "@/components/CustomPopover";

export const Influencers = () => {
  const {
    fetchInfluencers,
    influencers,
    setSelectedInfluencer,
    influencersData,
    handleDeleteInfluencerById,
  } = useInfluencer();
  const { accessToken, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const currentLimit = searchParams.get("pageSize") || "10";
  const currentPage = searchParams.get("page") || "1";
  const navigate = useNavigate();

  function handleNavigateDetails(id: number) {
    setSelectedInfluencer(
      influencers.filter((influencer) => influencer.id === id)[0]
    );
    navigate(`./${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      if (!loading) {
        try {
          await fetchInfluencers(
            {
              brands: "",
              categories: "",
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
  }, [currentPage, currentLimit, loading]);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <section className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4">
          <CustomPopover
            icon={<Funnel size={20} />}
            triggerText="Filtro"
            triggerClassName="px-2 py-1 flex flex-row items-center gap-2 hover:bg-slate-400 rounded border border-slate-500"
          >
            {(closePopover) => <div>Ainda não implementado</div>}
          </CustomPopover>
        </div>
        <ModalForm />
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
                                handleDeleteInfluencerById(influencer.id.toString());
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
