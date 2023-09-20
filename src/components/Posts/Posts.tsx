import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./posts.module.css";
import {
   postsState,
   addPost,
   removePost,
   setActiveId,
} from "../../redux/postsReducer";

export const Posts = () => {
   const inputRef = useRef<HTMLInputElement>(null);
   const formRef = useRef<HTMLFormElement>(null);

   const { posts, activeId } = useAppSelector(postsState);
   const dispatch = useAppDispatch();

   const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(addPost(inputRef.current?.value as string));
      formRef.current?.reset();
   };
   useEffect(() => {
      localStorage.setItem("posts", JSON.stringify(posts));
   }, [posts]);
   useEffect(() => {
      localStorage.setItem("activeId", JSON.stringify(activeId));
   }, [activeId]);

   return (
      <div className={styles.post}>
         <h2>Items</h2>
         <form
            className={styles.postForm}
            onSubmit={submitHandler}
            ref={formRef}
         >
            <input
               ref={inputRef}
               type="text"
               className={styles.postInput}
               placeholder="Type name here..."
               required
            />
            <Button info> Add New</Button>
         </form>
         <ul className={styles.postList}>
            {posts.map(({ id, name, comments }) => {
               return (
                  <li
                     className={clsx(styles.postItem, {
                        [styles.postItemActive]: id === activeId?.id ,
                     })}
                     key={id}
                     onClick={() => dispatch(setActiveId(id))}
                  >
                     <div className={styles.postItemTitle}>{name}</div>
                     <div className={styles.postCommentsLength}>
                        {comments.length}
                     </div>
                     <Button danger onClick={() => dispatch(removePost(id))}>
                        Delete
                     </Button>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};
