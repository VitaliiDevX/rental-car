import css from "./Loader.module.css";

interface LoaderProps {
  message?: string;
  className?: string;
}

export default function Loader({
  message = "Loading...",
  className,
}: LoaderProps) {
  return (
    <div className={`${css.loaderWrapper} ${className || ""}`}>
      <div className={css.spinner}></div>
      {message && <p className={css.text}>{message}</p>}
    </div>
  );
}
