import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const parseSubCommand = new Command()
  .name("parse")
  .description("Parse mongoDB export data and generate json file")
  .action(() => {
  });
