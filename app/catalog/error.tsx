"use client";

import Link from "next/link";
import css from "@/app/Error.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className={css.container}>
      <Image
        className={css.bgImage}
        src="/home-bg.jpg"
        alt="Luxury car on a highway"
        fill
        priority
      />
      <div className={css.overlay} />

      <div className={css.globalContainer}>
        <div className={css.content}>
          <h2 className={css.title}>Fleet Connection Lost</h2>
          <p className={css.text}>
            We couldn`t load the car catalog. This might be a temporary issue
            with our database.
          </p>
          <div className={css.buttonGroup}>
            <Button onClick={() => reset()} className={css.button}>
              Refresh Catalog
            </Button>
            <Link href="/" className={css.link}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
