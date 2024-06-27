import "dotenv/config";

import { createAdminClient } from "@/lib/supabase-admin";
import { Command } from "commander";

const program = new Command();
const supabase = createAdminClient();

program
  .name("DownloadTracker CLI")
  .description("CLI to manage the DownloadTracker server")
  .version("2.0.0");

program
  .command("users:list")
  .description("List all users")
  .action(async () => {
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers();

    if (!users.length) console.log("❌ No users found!");
    else
      console.table(users.map((user) => ({ id: user.id, email: user.email })));
  });

program
  .command("users:delete")
  .description("Delete a user")
  .argument("<id>", "user id")
  .action(async (id) => {
    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      console.error(`❌ Error deleting user: ${error.message}`);
    } else {
      console.log(`✅ User deleted successfully!`);
    }
  });

program
  .command("admins:list")
  .description("List all admins")
  .action(async () => {
    const { data: admins } = await supabase.from("admins").select("id");

    if (!admins.length) console.log("❌ No admins found!");
    else console.table(admins);
  });

program
  .command("admins:add")
  .description("Add an admin")
  .argument("<id>", "admin id")
  .action(async (id) => {
    const { data, error } = await supabase.from("admins").insert({ id });

    if (error) {
      console.error(`❌ Error adding admin: ${error.message}`);
    } else {
      console.log(`✅ Admin added successfully!`);
    }
  });

program
  .command("admins:delete")
  .description("Delete an admin")
  .argument("<id>", "admin id")
  .action(async (id) => {
    const { error } = await supabase.from("admins").delete().eq("id", id);

    if (error) {
      console.error(`❌ Error deleting admin: ${error.message}`);
    } else {
      console.log(`✅ Admin deleted successfully!`);
    }
  });

program.parse();
