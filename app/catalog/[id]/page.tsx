import { fetchCarById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { notFound } from "next/navigation";
import axios from "axios";
import { Metadata } from "next";

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const car = await fetchCarById(id);

    const title = `${car.brand} ${car.model} (${car.year}) | RentalCar`;
    const description = `Rent the ${car.brand} ${car.model} in ${car.address
      .split(",")
      .slice(-2)
      .join(
        ", ",
      )}. Price: $${car.rentalPrice}/day. ${car.description.slice(0, 100)}...`;

    return {
      title,
      description,
      openGraph: {
        title: `${car.brand} ${car.model} for Rent`,
        description: `Check out this ${car.brand} ${car.model} on RentalCar. Great conditions, best price!`,
        url: `/catalog/${id}`, //! add url
        images: [
          {
            url: car.img,
            width: 1200,
            height: 630,
            alt: `${car.brand} ${car.model}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [car.img],
      },
    };
  } catch {
    return {
      title: "Car Details | RentalCar",
      description: "Detailed information about the car.",
    };
  }
}

export default async function CarDetails({ params }: CarDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ["fetchCarById", id],
      queryFn: () => fetchCarById(id),
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        notFound();
      }
    }
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
}
