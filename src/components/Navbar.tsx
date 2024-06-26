import { createClient } from "@/lib/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <nav className="flex w-full border-b justify-between items-center gap-4 px-4 sm:py-5">
      <h4>DownloadTracker</h4>
      <Avatar>
        <AvatarImage
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.custom_claims.global_name}
        />
        <AvatarFallback>
          {user.user_metadata.custom_claims.global_name[0]}
        </AvatarFallback>
      </Avatar>
    </nav>
  );
}
