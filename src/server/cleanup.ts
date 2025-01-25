import http from "node:http";

export function registerTerminationListeners(server: http.Server) {
  process.on("SIGTERM", async () => await runCleanup(server));
  process.on("SIGINT", async () => await runCleanup(server));
}

async function runCleanup(server: http.Server) {
  server.close(() => {
    console.log("shutting down the server");
    process.exit(0);
  });
}