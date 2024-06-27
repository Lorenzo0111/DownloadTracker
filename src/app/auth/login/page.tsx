import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const signIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: (process.env.NEXT_PUBLIC_AUTH_METHOD as Provider) || "discord",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) console.log(error);
    else return redirect(data.url!);

    return null;
  };

  return (
    <form action={signIn} className="m-auto">
      <Button type="submit">Login</Button>
    </form>
  );
}
