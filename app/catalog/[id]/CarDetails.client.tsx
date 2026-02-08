"use client";

import { fetchCarById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./CarDetails.module.css";
import Image from "next/image";
import clsx from "clsx";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchCarById", id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader message="Fetching car specifications..." />;
  }

  if (isError || !car) {
    return (
      <div className={css.errorContainer}>
        <p>Unable to load car details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width="640"
          height="512"
          priority
        />
      </div>

      <div className={css.formCard}>
        <BookingForm />
      </div>

      <article className={css.descriptionWrapper}>
        <section className={css.mainInfo}>
          <div className={css.headerLine}>
            <h2 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h2>
            <p className={css.id}>Id: {car.id.slice(0, 4)}</p>
          </div>
          <div className={css.locationWrapper}>
            <svg className={css.location} width="16" height="16">
              <use href="/sprite.svg#location" />
            </svg>
            <p className={clsx(css.text, css.address)}>
              {car.address.split(",").slice(-2).join(", ").trim()}
            </p>
            <p className={css.text}>
              Mileage: {Number(car.mileage).toLocaleString("uk-UA")} km
            </p>
          </div>
          <p className={css.price}>${car.rentalPrice}</p>
          <p className={css.description}>{car.description}</p>
        </section>

        <div className={css.detailsWrapper}>
          <section className={css.detailsSection}>
            <h3 className={css.sectionTitle}>Rental Conditions:</h3>
            <ul className={css.detailsList}>
              {car.rentalConditions.map((condition) => (
                <li key={condition} className={css.listText}>
                  <svg className={css.checkIcon} width="16" height="16">
                    <use href="/sprite.svg#check-circle" />
                  </svg>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={css.detailsSection}>
            <h3 className={css.sectionTitle}>Car Specifications:</h3>
            <ul className={css.detailsList}>
              <li className={css.listText}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/sprite.svg#calendar" />
                </svg>
                <span>{`Year: ${car.year}`}</span>
              </li>
              <li className={css.listText}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/sprite.svg#car" />
                </svg>
                <span>{`Type: ${car.type}`}</span>
              </li>
              <li className={css.listText}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/sprite.svg#fuel-pump" />
                </svg>
                <span>{`Fuel Consumption: ${car.fuelConsumption}`}</span>
              </li>
              <li className={css.listText}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/sprite.svg#gear" />
                </svg>
                <span>{`Engine Size: ${car.engineSize}`}</span>
              </li>
            </ul>
          </section>

          <section className={css.detailsSection}>
            <h3 className={css.sectionTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={css.detailsList}>
              {[...car.accessories, ...car.functionalities].map((feature) => (
                <li key={feature} className={css.listText}>
                  <svg className={css.checkIcon} width="16" height="16">
                    <use href="/sprite.svg#check-circle" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
