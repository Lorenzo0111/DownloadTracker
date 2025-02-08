import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}
