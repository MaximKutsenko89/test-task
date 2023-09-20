import type { InitialState } from "../types/types";
import type { RootState } from "./store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { idGenerator } from "../utils";

const storedPosts = JSON.parse(localStorage.getItem("posts") as string);
const storedId = JSON.parse(localStorage.getItem("activeId") as string);
const initialState: InitialState = {
   posts: storedPosts || [
      {
         id: idGenerator(10),
         name: "Test",
         comments: [{ id: "0", body: "test", color: "#000" }],
      },
   ],
   activeId: storedId || null,
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      addPost: (state, action: PayloadAction<string>) => {
         state.posts = [
            ...state.posts,
            { id: idGenerator(10), name: action.payload, comments: [] },
         ];
      },

      removePost: (state, action: PayloadAction<string>) => {
         state.posts = state.posts.filter((item) => item.id !== action.payload);
      },
      
      setActiveId: (state, action: PayloadAction<string>) => {
         const foundPost = state.posts.find(
            (item) => item.id === action.payload
         );
         state.activeId = foundPost ? foundPost : null;
      },
      addComment: (
         state,
         action: PayloadAction<{ body: string; color: string }>
      ) => {
         const { body, color } = action.payload;
         if (state.activeId) {
            state.activeId.comments = [
               ...state.activeId.comments,
               { id: idGenerator(10), body, color },
            ];
            state.posts = state.posts.map((item) => {
               if (item.id === state.activeId?.id) {
                  return { ...state.activeId };
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
