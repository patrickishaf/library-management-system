import { getConfig } from "./appconfig";

export * from "./appconfig";
export * from "./util";
export * from "./logger";

const config = getConfig();

export default config;