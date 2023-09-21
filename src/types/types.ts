export type InitialState = {
   posts: Post[];
};

export type Post = {
   id: string;
   name: string;
   comments: Comment[];
   active:boolean
};

export type Comment = {
   body: string;
   color: string;
   id: string;
};
export type ButtonProps = {
   children: React.ReactNode;
   onClick?: () => void;
   type?: string;
   info?: boolean;
   danger?: boolean;
   primary?: boolean;
};
