import { API_KEY, RELAYER_BASE_URL } from "../globals";

export const checkEnvVariables = () => {
  if (!RELAYER_BASE_URL) {
    throw new Error("No RELAYER_BASE_URL provided.");
  }

  if (!API_KEY) {
    throw new Error("No API_KEY provided.");
  }
};
