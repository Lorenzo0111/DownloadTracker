import type { Database } from "@/types/supabase";
import { createClient as _createClient } from "@supabase/supabase-js";

export const createAdminClient = () =>
  _createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET!
  );
