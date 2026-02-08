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
          <h2 className={css.title}>Car Not Found</h2>
          <p className={css.text}>
            The vehicle you are looking for is currently unavailable or the link
            is broken.
          </p>
          <div className={css.buttonGroup}>
            <Button onClick={() => reset()} className={css.button}>
              Try to Reload
            </Button>
            <Link href="/catalog" className={css.link}>
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
