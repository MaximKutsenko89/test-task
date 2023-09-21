import type { InitialState } from "../types/types";
import type { RootState } from "./store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { idGenerator } from "../utils";

const storedPosts = JSON.parse(localStorage.getItem("posts") as string);

const initialState: InitialState = {
   posts: storedPosts || [
      {
         id: idGenerator(10),
         name: "Test",
         comments: [{ id: "0", body: "test", color: "#000" }],
         active: true,
      },
   ],
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      addPost: (state, action: PayloadAction<string>) => {
         state.posts = [
            ...state.posts,
            {
               id: idGenerator(10),
               name: action.payload,
               comments: [],
               active: false,
            },
         ];
      },

      removePost: (state, action: PayloadAction<string>) => {
         const removedPostIndex = state.posts.findIndex(
            (item) => item.id === action.payload
         );

         if (removedPostIndex !== -1) {
            if (state.posts[removedPostIndex].active) {
               if (removedPostIndex + 1 < state.posts.length) {
                  state.posts[removedPostIndex + 1].active = true;
               } else if (removedPostIndex - 1 >= 0) {
                  state.posts[removedPostIndex - 1].active = true;
               }
            }

            state.posts.splice(removedPostIndex, 1);
         }
      },

      setActiveId: (state, action: PayloadAction<string>) => {
         state.posts = state.posts.map((item) => {
            if (item.id === action.payload) {
               state.posts.forEach((item) => (item.active = false));
               return {
                  ...item,
                  active: true,
               };
            }
            return item;
         });
      },
      addComment: (
         state,
         action: PayloadAction<{ body: string; color: string }>
      ) => {
         const { body, color } = action.payload;
         const activePost = state.posts.find((item) => item.active === true);

         if (activePost) {
            activePost.comments = [
               ...activePost.comments,
               { id: idGenerator(10), body, color },
            ];
            state.posts = state.posts.map((item) => {
               if (item.id === activePost?.id) {
                  return { ...activePost };
               }
               return item;
            });
         }
      },
   },
});

export const { addPost, removePost, setActiveId, addComment } =
   postsSlice.actions;
export const postsState = (state: RootState) => state.posts;
export default postsSlice.reducer;
