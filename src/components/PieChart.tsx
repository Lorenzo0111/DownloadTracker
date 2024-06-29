"use client";

import type { ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Chart({
  data,
  title,
  children,
}: {
  data: { name: string; total: number }[];
  title: string;
  children?: ReactNode;
}) {
  return (
    <Card className="w-1/2 flex flex-col justify-end">
      <CardHeader>
        <CardTitle className="flex items-center justify-between h-10">
          <p>{title}</p> {children}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-auto">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="white"
              paddingAngle={5}
              dataKey="total"
              label={({ name }) => name}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill="white" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
