import { getConfig } from "./appconfig";

export * from "./appconfig";
export * from "./util";

const config = getConfig();

export default config;