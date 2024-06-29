import ProjectsChart from "@/components/ProjectsChart";
import ProjectSelect from "@/components/ProjectSelect";
import RefererChart from "@/components/RefererChart";
import StatsCards from "@/components/StatsCards";
import TimeChart from "@/components/TimeChart";
import VersionsChart from "@/components/VersionsChart";
import { createClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export default async function Page({
  searchParams: { active = "*" },
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
      <div className="flex gap-6">
        <TimeChart downloads={filteredDownloads} active={active} />
        {active === "*" && <ProjectsChart downloads={filteredDownloads} />}
        {active !== "*" && <VersionsChart downloads={filteredDownloads} />}
        <RefererChart downloads={filteredDownloads} />
      </div>
    </div>
  );
}
