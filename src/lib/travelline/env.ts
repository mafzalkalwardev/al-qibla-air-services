export function getTravelLineConfig() {
  return {
    baseUrl: process.env.TRAVELLINE_BASE_URL || "https://travellinetour.com",
    adminUrl: process.env.TRAVELLINE_ADMIN_URL || "https://admin.travellinetour.com",
    username: process.env.TRAVELLINE_AGENT_USERNAME || "",
    password: process.env.TRAVELLINE_AGENT_PASSWORD || "",
    flightsPath: process.env.TRAVELLINE_FLIGHTS_API_PATH || "/api/flights",
    umrahPath: process.env.TRAVELLINE_UMRAH_API_PATH || "/api/umrah-packages",
    toursPath: process.env.TRAVELLINE_TOURS_API_PATH || "/api/tour-packages",
    promosPath: process.env.TRAVELLINE_PROMOS_API_PATH || "/api/promos",
    markupPercent: Number(process.env.TRAVELLINE_PRICE_MARKUP_PERCENT || "0"),
  };
}

export function isTravelLineConfigured(): boolean {
  const { username, password } = getTravelLineConfig();
  return Boolean(username && password);
}

/** Public umrah-packages API works without agent credentials */
export function isTravelLineSyncEnabled(): boolean {
  return Boolean(getTravelLineConfig().baseUrl);
}
