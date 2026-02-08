import Image from "next/image";
import css from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={css.hero}>
      <Image src="/home-bg.jpg" alt="Luxury car on a highway" fill priority />
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </div>
  );
}
