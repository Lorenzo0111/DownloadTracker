import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const signIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) console.log(error);
    else return redirect(data.url!);

    return null;
  };

  return (
    <div>
      <form action={signIn}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
