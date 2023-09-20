import styles from "./button.module.css";
import clsx from "clsx";
import { ButtonProps } from "../../types/types";

export const Button = ({
   children,
   danger,
   info,
   primary,
   onClick,
}: ButtonProps) => {
   const classNames = clsx(styles.btn, {
      [styles.btnDanger]: danger,
      [styles.btnPrimary]: primary,
      [styles.btnInfo]: info,
   });
   return (
      <button className={classNames} onClick={onClick}>
         {children}
      </button>
   );
};
