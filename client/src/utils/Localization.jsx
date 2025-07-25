let testing = true;
// backend url
const devUrl = "http://localhost:5000";
const productionUrl = "";
let baseUrl = testing ? devUrl : productionUrl;
const ROLES = {
  GLOBAL_ADMIN: "global_admin",
  REGIONAL_ADMIN: "regional_admin",
  SENDER_PARTNER: "sending_partner",
  RECEIVING_PARTNER: "receiving_partner",
};
export { baseUrl, ROLES };
