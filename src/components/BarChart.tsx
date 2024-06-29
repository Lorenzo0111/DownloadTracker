"use client";

import type { ReactNode } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
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
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
