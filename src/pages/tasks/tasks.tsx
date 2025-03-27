import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";  // Importe o useQueryClient

const TasksPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();  // Obtenha o queryClient

  // Obter a lista de tarefas usando o TRPC
  const { data: tasks, isLoading, error } = trpc.task.listar.useQuery();
  
  // A mutação para excluir uma tarefa
  const { mutateAsync: deleteTask } = trpc.task.deletar.useMutation({
    onSuccess: () => {
      // Invalida a query de listar tarefas para que a lista seja recarregada
      queryClient.invalidateQueries("task.listar");  
    },
  });

  if (isLoading) return <div className="text-center">Carregando tarefas...</div>;
  if (error) return <div className="text-center text-red-500">Erro ao carregar tarefas: {error.message}</div>;

  if (!tasks) return <div className="text-center">Não há tarefas cadastradas.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <img 
        src="/images/logo.png"
        alt="Logo" 
        className="mx-auto mb-6 bg-blue-900"
        style={{ width: "150px", height: "auto" }} 
      />
      <h1 className="text-4xl font-bold text-center mb-6">Gerenciador de Tarefas</h1>
      <h3 className="text-3xl font-bold text-center mb-6">Lista de Tarefas</h3>
      
      <button
        onClick={() => router.push("/tasks/new")}
        className="bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 mb-6 block mx-auto"
      >
        Criar nova tarefa
      </button>

      {tasks.length === 0 ? (
        <p className="text-center">Não há tarefas cadastradas.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border rounded-lg shadow-md mb-4 p-6 bg-gray-50 transition transform hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{task.titulo}</h2>
              <p className="text-gray-700">{task.descricao}</p>
              <div className="mt-4 flex justify-start space-x-2">
                <button
                  onClick={() => router.push(`/tasks/edit/${task.id}`)}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
                      // Chama a mutação para excluir a tarefa
                      await deleteTask({ id: task.id });
                    }
                  }}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
