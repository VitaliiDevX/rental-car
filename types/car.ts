export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarFilters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

export type BrandList = string[];

export const INITIAL_PAGE = 1;

export const INITIAL_FILTERS: CarFilters = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};
