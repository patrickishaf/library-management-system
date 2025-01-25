import { bootstrapApplication } from "./server";

async function main() {
  try {
    bootstrapApplication();
  } catch (err: any) {
    console.error(`FAILED TO START APPLICATION. ERROR: `, err.messsage);
  }
}

main();