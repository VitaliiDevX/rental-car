import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  isLoading,
  loadingText = "Loading...",
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, className)}
      disabled={isLoading}
      style={{
        ...style,
      }}
      {...props}
    >
      {isLoading ? (
        <span className={css.loaderWrapper}>
          <span className={css.spinner}></span>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
