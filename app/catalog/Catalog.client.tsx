"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchCarBrands, fetchCars } from "@/lib/api";
import { CarFilters, INITIAL_PAGE } from "@/types/car";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import css from "./Catalog.module.css";
import CarList from "@/components/CarList/CarList";
import { useCarStore } from "@/lib/store/carStore";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { useEffect } from "react";

export default function CarsClient() {
  const { filters, setFilters, resetFilters } = useCarStore();

  const { brand, rentalPrice, minMileage, maxMileage } = filters;

  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, [resetFilters]);

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchCarBrands,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const {
    data: cars,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["cars", brand, rentalPrice, minMileage, maxMileage],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      fetchCars({
        page: String(pageParam),
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
      }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? Number(lastPage.page) + 1
        : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.cars),
    refetchOnMount: false,
  });

  const handleSearch = async (newFilters: CarFilters) => {
    setFilters(newFilters);
  };

  const hasCars = cars && cars.length > 0;

  return (
    <div className={css.container}>
      <div className={css.searchWrapper}>
        <SearchBox
          brands={brands}
          onSearch={handleSearch}
          isLoading={isFetching && !isFetchingNextPage}
          initialFilters={filters}
        />
      </div>

      {isFetching && !hasCars ? (
        <Loader message="Searching for cars..." />
      ) : (
        <>
          {hasCars && <CarList cars={cars} />}

          {!isFetching && !hasCars && (
            <div className={css.noResults}>
              No cars found matching your criteria.
            </div>
          )}
        </>
      )}

      {hasNextPage && hasCars && (
        <Button
          className={css.loadMoreBtn}
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          loadingText="Loading..."
        >
          Load more
        </Button>
      )}
    </div>
  );
}
