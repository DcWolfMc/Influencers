import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FunctionComponent } from "react";
import { SmallButton } from "../SmallButton";
import {
  CaretRight,
  CaretDoubleRight,
  CaretLeft,
  CaretDoubleLeft,
} from "@phosphor-icons/react";
import useWindowDimensions from "@/util/getWindowDimensions";

interface PaginationProps {
  totalOfItems: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  totalOfItems,
}) => {
  const { width } = useWindowDimensions();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentLimit = Number(searchParams.get("pageSize") || 10);
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(totalOfItems / currentLimit);

  function handleChangePage(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    navigate({ pathname, search: params.toString() });
  }

  function handleNextPage() {
    handleChangePage(currentPage + 1);
  }

  function handlePreviousPage() {
    handleChangePage(currentPage - 1);
  }

  function handleJumpToFirstPage() {
    handleChangePage(1);
  }

  function handleJumpToLastPage() {
    handleChangePage(totalPages);
  }

  const renderPageButtons = () => {
    const buttons = [];

    // Previous pages
    for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
      buttons.push(
        <SmallButton
          key={i}
          variant="outline"
          size="fixed-square"
          style={width < 768 && i === currentPage - 2 ? { display: "none" } : {}}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </SmallButton>
      );
    }

    // Current page
    buttons.push(
      <SmallButton
        key={currentPage}
        variant="outline"
        size="fixed-square"
        disabled
        className="flex flex-row gap-2 justify-center items-center px-4 py-1 rounded-lg text-lg text-orange-700 dark:text-orange-500 border border-orange-700 dark:border-orange-700 bg-transparent enabled:hover:bg-slate-500/50 enabled:dark:hover:bg-slate-500 disabled:opacity-70"
      >
        {currentPage}
      </SmallButton>
    );

    // Next pages
    for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 3); i++) {
      buttons.push(
        <SmallButton
          key={i}
          variant="outline"
          size="fixed-square"
          style={
            width < 768 && i === currentPage + 3
              ? { display: "none" }
              : width < 375 && i === currentPage + 2
              ? { display: "none" }
              : {}
          }
          onClick={() => handleChangePage(i)}
        >
          {i}
        </SmallButton>
      );
    }

    // Ellipsis and last page
    if (currentPage + 3 < totalPages) {
      if (currentPage + 4 < totalPages) {
        buttons.push(
          <SmallButton
            key="ellipsis"
            variant="outline"
            size="fixed-square"
            style={width < 768 ? { display: "none" } : {}}
            disabled
          >
            ...
          </SmallButton>
        );
      }
      buttons.push(
        <SmallButton
          key={totalPages}
          variant="outline"
          size="fixed-square"
          style={width < 768 ? { display: "none" } : {}}
          onClick={() => handleChangePage(totalPages)}
        >
          {totalPages}
        </SmallButton>
      );
    }

    return buttons;
  };

  return (
    <div className="flex flex-row gap-1 md:gap-2 items-stretch justify-center">
      <SmallButton
        icon={CaretDoubleLeft}
        variant="outline"
        size="fixed-square"
        onClick={handleJumpToFirstPage}
        disabled={currentPage === 1}
      />
      <SmallButton
        icon={CaretLeft}
        variant="outline"
        size="fixed-square"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />

      {renderPageButtons()}

      <SmallButton
        icon={CaretRight}
        variant="outline"
        size="fixed-square"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
      <SmallButton
        icon={CaretDoubleRight}
        variant="outline"
        size="fixed-square"
        onClick={handleJumpToLastPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
