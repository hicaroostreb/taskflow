"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ProtectedRoute from "@/components/ProtectedRoute";

type Project = {
  id: string;
  name: string;
  created_at: string;
};

export default function Projects() {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Erro ao carregar projetos: " + error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Seus Projetos</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : projects.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                {project.name} - {new Date(project.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
