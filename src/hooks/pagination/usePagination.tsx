import { useEffect, useState } from 'react';

interface UsePaginationProps<T> {
  fetchData: (page: number) => Promise<{ items: T[]; totalCount: number }>;
  itemsPerPage: number;
}

interface UsePaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

/*  좌우 버튼을 통해 페이지네이션을 하는 경우 사용
    (예시) const = {items, handlePrevClick, handleNextClick} = usePagination<Dashboard>({
      fetchData: fetchDashboards,
      itemsPerPage: ITEMS_PER_PAGE,
    }); */

function usePagination<T>({
  fetchData,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    async function loadItems() {
      const result = await fetchData(currentPage);
      setItems(result.items);
      setTotalPage(Math.ceil(result.totalCount / itemsPerPage));
    }
    loadItems();
  }, [currentPage, fetchData, itemsPerPage]);

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {
    items,
    currentPage,
    totalPages,
    handlePrevClick,
    handleNextClick,
  };
}

export default usePagination;
