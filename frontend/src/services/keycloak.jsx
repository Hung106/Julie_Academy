import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://auth.julieacademy.io.vn",
  realm: "Julie_Academy",
  clientId: "Julie_Academy",
});

export default keycloak;
