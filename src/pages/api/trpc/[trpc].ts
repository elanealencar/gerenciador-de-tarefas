import { createNextApiHandler } from "@trpc/server/adapters/next";
import { router } from "../../../server/trpc";
import { taskRouter } from "../../../server/routers/taskRouter";

const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
});
