"use client";

import { Button } from "./ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProjectSelect({ projects }: { projects: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const active = searchParams.get("active") || "*";

  return (
    <div className="flex gap-2">
      <Button
        variant={active === "*" ? "secondary" : "outline"}
        onClick={() => router.push("?active=*")}
      >
        All projects
      </Button>
      {projects.map((project) => (
        <Button
          variant={active === project ? "secondary" : "outline"}
          onClick={() => router.push(`?active=${project}`)}
          key={project}
        >
          {project}
        </Button>
      ))}
    </div>
  );
}
