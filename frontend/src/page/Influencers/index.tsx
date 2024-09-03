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
import { getAllInfluencers } from "@/service/api";
import { File, NotePencil, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { GetAllInfluencersData } from "@/@types/influencerDataType";

export const Influencers = () => {
  const { accessToken, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const currentLimit = searchParams.get("pageSize") || "10";
  const currentPage = searchParams.get("page") || "1";
  const [influencersData, setInfluencersData] = useState<GetAllInfluencersData>(
    { influencers: [], pageSize: 10, totalCount: 0, totalPages: 1 }
  );

  useEffect(() => {
    async function fetchData() {
      if (!loading) {
        try {
          const response = await getAllInfluencers(
            {
              brands: "",
              categories: "",
              page: currentPage,
              pageSize: currentLimit,
            },
            accessToken ? accessToken : ""
          );
          setInfluencersData(response.data);
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
      <section></section>
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
                  <TableCell className="">{influencer.followers}</TableCell>
                  <TableCell
                    id="actions"
                    className="flex flex-row max-w-[240px] gap-4"
                  >
                    <IconButton
                      icon={File}
                      iconProps={{ size: 20, weight: "bold" }}
                    />
                    <IconButton
                      icon={NotePencil}
                      iconProps={{ size: 20, weight: "bold" }}
                    />
                    <IconButton
                      icon={Trash}
                      iconProps={{ size: 20, weight: "bold" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <Pagination totalOfItems={influencersData.totalCount} />
    </div>
  );
};
