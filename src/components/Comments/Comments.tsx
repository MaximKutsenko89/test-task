import { useRef, useState } from "react";
import { Button } from "../Button/Button";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { postsState, addComment } from "../../redux/postsReducer";
import styles from "./comments.module.css";

export const Comments = () => {
   const { activeId } = useAppSelector(postsState);
   const dispatch = useAppDispatch();

   const textInputRef = useRef<HTMLTextAreaElement>(null);

   const [colorValue, setColorValue] = useState("#000000");
   const formRef = useRef<HTMLFormElement>(null);

   const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch(
         addComment({
            body: textInputRef.current?.value as string,
            color: colorValue,
         })
      );
      formRef.current?.reset();
      setColorValue('#000')
   };
   return (
      <div className={styles.comments}>
         <h2>Comments {activeId?.id}</h2>
         <ul className={styles.commentsList}>
            {activeId?.comments.map(({ color, body, id }) => {
               return (
                  <li className={styles.commentsItem} key={id}>
                     <div
                        className={styles.commentsColor}
                        style={{ backgroundColor: `${color}` }}
                     />
                     <div className={styles.commentsText}>{body}</div>
                  </li>
               );
            })}
         </ul>
         <form
            className={styles.commentsForm}
            ref={formRef}
            onSubmit={submitHandler}
         >
            <input
               type="color"
               name="color"
               id="color"
               onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setColorValue(event.target.value)
               }
               value={colorValue}
            />
            <textarea
               name="comment"
               id="comment"
               placeholder="Type comment here..."
               required
               ref={textInputRef}
            />
            <Button primary>Add New</Button>
         </form>
      </div>
   );
};
