import { useInfluencer } from "@/context/InfluencersContext";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, NotePencil, User } from "phosphor-react";
import { formatNumber } from "@/util/formatter";
import { Tag } from "@/components/Tag";
export const InfluencerDetails: React.FC = () => {
  const { selectedInfluencer } = useInfluencer();
  console.log("selectedInfluencer", selectedInfluencer);
  //   const { influencerId } = useParams();
  const navigate = useNavigate();

  if (!selectedInfluencer) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center gap-16">
      <div className="w-full pb-4 flex flex-col justify-center items-center border-b border-slate-600">
      <section className="w-full flex md:flex-row flex-col gap-8 justify-center items-center">
      <button
        className="md:absolute md:h-40 left-4 top-0 md:m-0 px-6 py-2 md:p-4 self-start hover:bg-slate-500 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="md:size-10 size-8" weight="bold" />
      </button>
      <div className="flex md:flex-row flex-col gap-4 items-center">
        <Avatar className="aspect-square w-40 h-auto border-4 border-orange-500 shadow-md bg-slate-700">
          <AvatarImage src={selectedInfluencer.image} />
          <AvatarFallback className="bg-slate-300">
            <User size={160} className="text-slate-700" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-2 justify-start items-center">
              <strong className=" text-2xl ">{selectedInfluencer.name}</strong>
              <span className="text-slate-400 text-sm">
                {selectedInfluencer.instagram_name}
              </span>
            </div>
            <span className="text-slate-400 text-sm">
              {selectedInfluencer.email}
            </span>

            <div className="flex flex-row justify-between md:gap-8 gap-4">
              <div className="flex flex-row gap-2 text-sm font-bold">
                <span className=" uppercase text-slate-400">Seguidores:</span>
                <span>{formatNumber(selectedInfluencer.followers)}</span>
              </div>
              <div className="flex flex-row gap-2 text-sm font-bold">
                <span className=" uppercase text-slate-400">Seguindo:</span>
                <span>{formatNumber(selectedInfluencer.following)}</span>
              </div>
            </div>
            <div className="max-w-[336px] flex flex-row flex-wrap gap-2 justify-start">
              {selectedInfluencer.categories?.map((categorie) => (
                <Tag key={categorie.id} name={categorie.name} />
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>
      <div className="absolute right-4 top-0 flex-1 flex flex-row gap-4 justify-center items-center md:mt-0">
        <button className="flex gap-2 items-center h-10 px-4 border border-orange-500 hover:bg-orange-500 rounded transition-colors font-bold">
          <NotePencil />
          Editar
        </button>
      </div>
      </div>
      
      <section className="flex-grow flex flex-row h-full w-full bg-slate-900 shadow-inner">
        <div className="flex flex-col py-4 px-8 gap-2">
          <strong className="text-xl">Marcas</strong>
          <div className="flex flex-row gap-2 flex-wrap">
            {selectedInfluencer.brands?.map((brand) => (
              <div
                key={brand.id}
                className="px-4 py-2 min-h-14 min-w-[342px] flex flex-col border rounded"
              >
                <span>{`${brand.name} - ${brand.niche}`}</span>
                <span>{brand.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
