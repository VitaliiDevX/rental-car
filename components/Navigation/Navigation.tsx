"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import css from "./Navigation.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={css.nav}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(css.link, isActive && css.active)}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
