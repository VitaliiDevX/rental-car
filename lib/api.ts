import { BrandList, Car } from "@/types/car";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

interface FetchCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
}

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const fetchCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit = "12",
  page,
}: FetchCarsParams): Promise<FetchCarsResponse> => {
  const { data } = await axios.get<FetchCarsResponse>("/cars", {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit,
      page,
    },
  });

  return data;
};

export const fetchCarBrands = async (): Promise<BrandList> => {
  const { data } = await axios.get<BrandList>("/brands");

  return data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await axios.get<Car>(`/cars/${id}`);

  return data;
};
