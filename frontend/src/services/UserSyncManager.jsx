import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

function UserSyncManager() {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (!keycloak.token) return;

      try {
        const API_URL =
          import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${API_URL}/auth/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        });

        if (response.ok) {
          console.log("User synced/found successfully.");
        } else {
          console.error("Failed to sync user with backend.");
        }
      } catch (error) {
        console.error("Error during user sync API call:", error);
      }
    };

    if (initialized && keycloak.authenticated) {
      syncUserWithBackend();
    }
  }, [initialized, keycloak.authenticated, keycloak.token]);

  return null;
}

export default UserSyncManager;
