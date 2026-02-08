import css from "@/app/Loading.module.css";
import Loader from "@/components/Loader/Loader";

export default function Loading() {
  return <Loader className={css.overlay} />;
}
