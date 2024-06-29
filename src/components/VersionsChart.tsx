import type { Database } from "@/types/supabase";
import BarChart from "./BarChart";

export default function VersionsChart({
  downloads,
}: {
  downloads: Database["public"]["Tables"]["downloads"]["Row"][];
}) {
  const data = downloads.reduce((acc, { version }) => {
    if (version && !acc.includes(version)) {
      acc.push(version);
    }
    return acc;
  }, [] as string[]);

  return (
    <BarChart
      title="Most downloaded version"
      data={data.map((name) => ({
        name,
        total: downloads.filter((download) => download.version === name).length,
      }))}
    />
  );
}
