import { z } from "zod";
import { t } from "../trpc";
import { tasks } from "../tasks";
import { randomUUID } from "crypto";

export const taskRouter = t.router({
  
  criar: t.procedure
    .input(
      z.object({
        titulo: z.string().min(1, "O título é obrigatório"),
        descricao: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const novaTarefa = {
        id: randomUUID(),
        titulo: input.titulo,
        descricao: input.descricao || "",
        dataCriacao: new Date().toISOString(),
      };

      tasks.push(novaTarefa);
      return novaTarefa;
    }),

  listar: t.procedure.query(() => tasks),

  atualizar: t.procedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string().min(1, "O título é obrigatório"),
        descricao: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const tarefa = tasks.find((t) => t.id === input.id);
      if (!tarefa) throw new Error("Esta tarefa não foi encontrada");

      tarefa.titulo = input.titulo;
      tarefa.descricao = input.descricao || "";
      return tarefa;
    }),

  deletar: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const index = tasks.findIndex((t) => t.id === input.id);
      if (index === -1) throw new Error("Esta tarefa não foi encontrada");

      return tasks.splice(index, 1)[0];
    }),

    getTask: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const tarefa = tasks.find((t) => t.id === input.id);
      if (!tarefa) throw new Error("Tarefa não encontrada");
      return tarefa;
    }),
});
