import { fetchCarBrands, fetchCars } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarsClient from "./Catalog.client";
import { INITIAL_FILTERS, INITIAL_PAGE } from "@/types/car";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Catalog | RentalCar",
  description:
    "Explore our extensive catalog of rental cars. Filter by brand, price, and mileage to find the perfect vehicle for your next trip.",
  openGraph: {
    title: "Car Catalog | RentalCar",
    description:
      "Find the best deals on rental cars. Wide selection of brands and models available.",
    url: "", //! add url
    images: [
      {
        url: "/home-bg.jpg",
        width: 1200,
        height: 630,
        alt: "RentalCar Catalog Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Catalog | RentalCar",
    description: "Explore our car fleet and book your ride today.",
    images: ["/home-bg.jpg"],
  },
};

export default async function Catalog() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: [
        "cars",
        INITIAL_FILTERS.brand,
        INITIAL_FILTERS.rentalPrice,
        INITIAL_FILTERS.minMileage,
        INITIAL_FILTERS.maxMileage,
      ],
      queryFn: () =>
        fetchCars({ page: String(INITIAL_PAGE), ...INITIAL_FILTERS }),
      initialPageParam: INITIAL_PAGE,
    }),
    queryClient.prefetchQuery({
      queryKey: ["brands"],
      queryFn: fetchCarBrands,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient />
    </HydrationBoundary>
  );
}
