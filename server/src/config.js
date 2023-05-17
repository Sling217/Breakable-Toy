import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

const development = {
  steamKey: process.env.STEAM_GAMES_API_KEY,
  rawgKey: process.env.RAWG_API_KEY,
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 }
}

const test = { ...development }

const production = {
  ...development
}

const config = { development, test, production }

export default config[getNodeEnv()];