import { createAdminClient } from "./supabase-admin";

export async function track(
  project: string,
  version: string,
  ref: string | null
) {
  const supabase = createAdminClient();

  if (ref && ref.startsWith("http")) {
    ref = new URL(ref).hostname;
  }

  await supabase.from("downloads").insert({
    project,
    version,
    referer: ref || undefined,
  });
}
