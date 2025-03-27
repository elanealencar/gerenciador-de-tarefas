import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/tasks"); // Redireciona para a página de tarefas
  }, [router]);

  return <div>Redirecionando para a lista de tarefas...</div>;
};

export default Home;
