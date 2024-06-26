"use client";

import type { Database } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function StatsCards({
  downloads,
  active,
}: {
  downloads: Database["public"]["Tables"]["downloads"]["Row"][];
  active: string;
}) {
  return (
    <div className="flex gap-6">
      <StatCard title="Total downloads" value={downloads.length} />
      <StatCard
        title="Version count"
        value={
          downloads.reduce((acc, { version }) => {
            if (version && !acc.includes(version)) {
              acc.push(version);
            }
            return acc;
          }, [] as string[]).length
        }
      />
      <StatCard
        title="Most downloaded"
        value={
          active === "*"
            ? downloads.reduce(
                (acc, { project }) => {
                  const count = downloads.filter(
                    (download) => download.project === project
                  ).length;
                  if (count > acc.count) {
                    acc = { project: project || "", count };
                  }
                  return acc;
                },
                { project: "", count: 0 }
              ).project
            : downloads
                .filter((download) => download.project === active)
                .reduce(
                  (acc, { version }) => {
                    const count = downloads.filter(
                      (download) =>
                        download.project === active &&
                        download.version === version
                    ).length;
                    if (count > acc.count) {
                      acc = { version: version || "", count };
                    }
                    return acc;
                  },
                  { version: "", count: 0 }
                ).version
        }
      />
    </div>
  );
}
