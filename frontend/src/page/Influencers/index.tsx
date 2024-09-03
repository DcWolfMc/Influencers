import { IconButton } from "@/components/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, NotePencil, Trash } from "@phosphor-icons/react";
export const Influencers = () => {
  return (
    
    <Table className="">
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

        <TableRow className="">
          <TableCell className="font-medium">1</TableCell>
          <TableCell className="w-full flex-1">João de Paula</TableCell>
          <TableCell>jojoãop@gmail.com</TableCell>
          <TableCell>@jopaulajo</TableCell>
          <TableCell className=""></TableCell>
          <TableCell
            id="actions"
            className="flex flex-row max-w-[240px] gap-4"
          >
            <IconButton icon={File} iconProps={{ size: 20, weight:"bold" }} />
            <IconButton icon={NotePencil} iconProps={{ size: 20, weight:"bold" }} />
            <IconButton icon={Trash} iconProps={{ size: 20, weight:"bold" }} />
          </TableCell>
        </TableRow>

      </TableBody>
    </Table>
  );
};
