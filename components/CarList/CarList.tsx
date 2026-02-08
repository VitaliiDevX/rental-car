import { Car } from "@/types/car";
import css from "./CarList.module.css";
import CarItem from "../CarItem/CarItem";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </ul>
  );
}
