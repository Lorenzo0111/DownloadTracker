import ProjectSelect from "@/components/ProjectSelect";
import StatsCards from "@/components/StatsCards";
import TimeChart from "@/components/TimeChart";
import { createClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export default async function Page({
  searchParams: { active },
}: {
  searchParams: { active: string };
}) {
  const supabase = createClient();
  const { data: downloads } = (await supabase
    .from("downloads")
    .select("*")
    .order("date", { ascending: true })) as {
    data: Database["public"]["Tables"]["downloads"]["Row"][];
  };

  const projects = downloads.reduce((acc, { project }) => {
    if (project && !acc.includes(project)) {
      acc.push(project);
    }
    return acc;
  }, [] as string[]);

  const filteredDownloads = downloads.filter(
    (download) => download.project === active || active === "*"
  );

  return (
    <div className="p-8 flex flex-col gap-6">
      <ProjectSelect projects={projects} />
      <StatsCards downloads={filteredDownloads} active={active} />
      <TimeChart downloads={filteredDownloads} active={active} />
    </div>
  );
}
