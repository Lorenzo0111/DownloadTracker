import { createAdminClient } from "./supabase-admin";

export async function update(project: string, version: string) {
  const supabase = createAdminClient();

  await supabase.from("downloads").insert({
    project,
    version,
  });
}
