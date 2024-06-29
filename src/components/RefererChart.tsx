import type { Database } from "@/types/supabase";
import PieChart from "./PieChart";

export default function RefererChart({
  downloads,
}: {
  downloads: Database["public"]["Tables"]["downloads"]["Row"][];
}) {
  const data = downloads.reduce((acc, { referer }) => {
    if (referer && !acc.includes(referer)) {
      acc.push(referer);
    }
    return acc;
  }, [] as string[]);

  return (
    <PieChart
      title="Referers"
      data={data.map((name) => ({
        name,
        total: downloads.filter((download) => download.referer === name).length,
      }))}
    />
  );
}
