import Link from "next/link";
import css from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href={"/"} aria-label="Logo">
          <svg height="16" width="104">
            <use href="/sprite.svg#logo"></use>
          </svg>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
