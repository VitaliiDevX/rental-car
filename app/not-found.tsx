"use client";

import Link from "next/link";
import css from "./not-found.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      router.push("/catalog");
    }

    return () => clearInterval(timer);
  }, [seconds, router]);

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

      <div className={css.content}>
        <h1 className={css.errorCode}>404</h1>
        <h2 className={css.title}>Oops! Page not found</h2>
        <p className={css.text}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. <br />
          You will be redirected to the catalog in
          <span className={css.timer}> {seconds} </span>seconds...
        </p>
        <Link href="/catalog" className={css.button}>
          Back to Catalog
        </Link>
      </div>
    </section>
  );
}
