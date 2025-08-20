// logger.ts
import fs from "fs";
import pino, { Logger } from "pino";

const logDir = "./jobsdb_scrape_logs";

export function createLogger(name: string, enableLogging: boolean): Logger {
  let destination: pino.DestinationStream | undefined;

  if (enableLogging) {
    fs.mkdirSync(logDir, { recursive: true }); // ensure directory exists

    const now = new Date()
      .toISOString()
      .replace(/[:.]/g, "-"); // safe for filenames

    const destinationPath = `${logDir}/${name}-${now}.log`;

    destination = fs.createWriteStream(destinationPath, {
      flags: "w",
    });
  }

  return pino(
    {
      name,
      level: enableLogging ? "info" : "silent",
      transport: enableLogging
        ? {
            target: "pino-pretty",
            options: { colorize: true },
          }
        : undefined,
    },
    destination // will be undefined if logging disabled
  );
}
