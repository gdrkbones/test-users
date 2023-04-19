import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Post } from "~/domain/post";
import { CreateUserSquema, User } from "~/domain/user";

const userRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  getAll: publicProcedure
    .input(z.number().optional().default(1))
    .query(async ({ ctx, input }) => {
      console.log({ input });
      // console.log(
      //   `https://gorest.co.in/public/v2/users?${new URLSearchParams({
      //     page: String(input),
      //     per_pages: "20",
      //     "access-token": process.env.GOREST_TOKEN as string,
      //   })}`
      // );
      let maxPages = 0;
      const response = await fetch(
        // `https://gorest.co.in/public/v2/users?per_pages=10&pages=${input}&access-token=${process.env.GOREST_TOKEN}`
        `https://gorest.co.in/public/v2/users?${new URLSearchParams({
          page: String(input),
          per_pages: "20",
          "access-token": process.env.GOREST_TOKEN as string,
        })}`
      );
      maxPages = Number(response.headers.get("x-pagination-pages")) | 0;
      const users: User[] = await response.json();

      return { maxPages, users };
    }),

  getPosts: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    console.log({ input });

    return (
      await fetch(
        `https://gorest.co.in/public/v2/users/${input}/posts?access-token=${process.env.GOREST_TOKEN}`
      )
    ).json() as Promise<Post[]>;
  }),

  createUser: publicProcedure
    .input(CreateUserSquema)
    .mutation(async ({ ctx, input }) => {
      return (
        await fetch(
          `https://gorest.co.in/public/v2/users?access-token=${process.env.GOREST_TOKEN}`,
          {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
              "Content-Type": "application/json", // Add the Content-Type header here
            },
          }
        )
      ).json() as Promise<User>;
    }),
  deleteUser: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await fetch(
        `https://gorest.co.in/public/v2/users/${input}?access-token=${process.env.GOREST_TOKEN}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Add the Content-Type header here
          },
        }
      );
    }),
});

export default userRouter;
