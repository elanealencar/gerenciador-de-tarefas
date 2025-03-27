import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const EditTaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;
  
  const taskIdString = typeof taskId === "string" ? taskId : "";

  const { data: task, isLoading, error } = trpc.task.getTask.useQuery(
    { id: taskIdString },
    { enabled: !!taskIdString }
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const updateMutation = trpc.task.atualizar.useMutation();

  useEffect(() => {
    if (task) {
      setTitle(task.titulo || "");
      setDescription(task.descricao || "");
    }
  }, [task]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskIdString) {
      try {
        await updateMutation.mutateAsync({
          id: taskIdString,
          titulo: title,
          descricao: description,
        });
        alert("Tarefa atualizada com sucesso!");
        router.push("/tasks"); // Redireciona para a lista de tarefas
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar a tarefa.");
      }
    }
  };

  if (isLoading) return <div className="text-center">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Editar Tarefa</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Atualizar Tarefa
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
