import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const TaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;

  // Garantir que taskId seja uma string
  const taskIdString = typeof taskId === "string" ? taskId : "";

  const { data: task, isLoading, error } = trpc.task.getTask.useQuery(
    { id: taskIdString }, // Passar a taskIdString de forma segura
    { enabled: !!taskIdString } // Só faz a query quando taskId estiver disponível
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Usamos mutate para mutações (criar/atualizar)
  const createMutation = trpc.task.criar.useMutation();
  const updateMutation = trpc.task.atualizar.useMutation();

  useEffect(() => {
    if (task) {
      setTitle(task.titulo || ""); // Garantir que nunca seja vazio
      setDescription(task.descricao || ""); // Garantir que nunca seja vazio
    }
  }, [task]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskIdString) {
      // Se taskId existir, é uma atualização
      try {
        await updateMutation.mutateAsync({
          id: taskIdString,
          titulo: title,
          descricao: description,
        });
        alert("Tarefa atualizada com sucesso!");
        router.push("/"); // Redireciona para a lista de tarefas
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar a tarefa.");
      }
    } else {
      // Se taskId não existir, é uma criação
      try {
        await createMutation.mutateAsync({
          titulo: title,
          descricao: description,
        });
        alert("Tarefa criada com sucesso!");
        router.push("/"); // Redireciona para a lista de tarefas
      } catch (err) {
        console.error(err);
        alert("Erro ao criar a tarefa.");
      }
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>{taskIdString ? "Editar Tarefa" : "Criar Tarefa"}</h1>
      <form onSubmit={handleSave}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{taskIdString ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  );
};

export default TaskPage;
