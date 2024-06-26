import type { Database } from "@/types/supabase";
import Chart from "./Chart";

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
    <Chart
      title="Most downloaded version"
      data={data.map((name) => ({
        name,
        total: downloads.filter((download) => download.version === name).length,
      }))}
    />
  );
}
