import { z } from "zod";

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};
