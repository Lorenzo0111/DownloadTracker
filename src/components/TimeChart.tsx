"use client";

import type { Database } from "@/types/supabase";
import { useState } from "react";
import BarChart from "./BarChart";
import { Button } from "./ui/button";

export default function TimeChart({
  downloads,
  active,
}: {
  downloads: Database["public"]["Tables"]["downloads"]["Row"][];
  active: string;
}) {
  const [scale, setScale] = useState<"month" | "year">("month");

  const data = downloads
    .filter((download) => download.project === active || active === "*")
    .reduce((acc, { date }) => {
      const parsedDate = new Date(date);
      const name =
        scale === "month"
          ? parsedDate.toLocaleString("default", { month: "short" })
          : parsedDate.getFullYear().toString();
      const existing = acc.find((item) => item.name === name);
      if (existing) {
        existing.total++;
      } else {
        acc.push({ name, total: 1 });
      }
      return acc;
    }, [] as { name: string; total: number }[]);

  return (
    <BarChart title="Downloads over time" data={data}>
      <div className="flex gap-2">
        <Button
          variant={scale === "month" ? "secondary" : "outline"}
          onClick={() => setScale("month")}
        >
          Month
        </Button>
        <Button
          variant={scale === "year" ? "secondary" : "outline"}
          onClick={() => setScale("year")}
        >
          Year
        </Button>
      </div>
    </BarChart>
  );
}
