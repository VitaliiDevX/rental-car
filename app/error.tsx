"use client";

import css from "./Error.module.css";
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
          <h1 className={css.errorCode}>500</h1>
          <h2 className={css.title}>Critical System Failure</h2>
          <p className={css.text}>
            Something went wrong on a global level. We are working to get the
            engine started again.
          </p>
          <div className={css.buttonGroup}>
            <Button onClick={() => reset()} className={css.button}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
