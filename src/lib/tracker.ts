import { createClient } from "./supabase";

export async function update(project: string, version: string) {
  const supabase = createClient();

  await supabase.from("downloads").insert({
    project,
    version,
  });
}
