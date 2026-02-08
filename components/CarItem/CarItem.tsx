import { Car } from "@/types/car";
import css from "./CarItem.module.css";
import Image from "next/image";
import { useCarStore } from "@/lib/store/carStore";
import Link from "next/link";

interface CarItemProps {
  car: Car;
}

export default function CarItem({ car }: CarItemProps) {
  const { favorites, toggleFavorite } = useCarStore();
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  return (
    <li className={css.cardItem}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="274px"
        />
        <button
          className={css.favoriteBtn}
          type="button"
          onClick={() => toggleFavorite(car)}
          aria-label={isFavorite ? "Remove from favorite" : "Add to favorite"}
        >
          <svg width="16" height="16">
            <use href={`/sprite.svg#${isFavorite ? "fav-act" : "fav-def"}`} />
          </svg>
        </button>
      </div>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <ul className={css.detailsList}>
        {[
          car.address.split(",")[1]?.trim(),
          car.address.split(",")[2]?.trim(),
          car.rentalCompany,
          car.type,
          `${Number(car.mileage).toLocaleString("uk-UA")} km`,
        ].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Link
        href={`/catalog/${car.id}`}
        className={css.learnMoreBtn}
        type="button"
      >
        Read more
      </Link>
    </li>
  );
}
