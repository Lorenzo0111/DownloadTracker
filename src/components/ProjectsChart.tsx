import type { Database } from "@/types/supabase";
import Chart from "./Chart";

export default function ProjectsChart({
  downloads,
}: {
  downloads: Database["public"]["Tables"]["downloads"]["Row"][];
}) {
  const data = downloads.reduce((acc, { project }) => {
    if (project && !acc.includes(project)) {
      acc.push(project);
    }
    return acc;
  }, [] as string[]);

  return (
    <Chart
      title="Most downloaded project"
      data={data.map((name) => ({
        name,
        total: downloads.filter((download) => download.project === name).length,
      }))}
    />
  );
}
