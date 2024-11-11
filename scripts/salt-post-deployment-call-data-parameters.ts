import axios from "axios";
import crypto from "node:crypto";
import { DeployUpRequest, DeployUpResponse } from "../interface";
import { encodeVerifiableUri } from "../utils/encode-verifiable-uri";
import { generatePostDeploymentCallData } from "../utils/generate-post-deployment-call-data";
import { checkEnvVariables } from "../utils/check-env-variables";
import { checkInputVariables } from "../utils/check-input-variables";
import { API_KEY, RELAYER_BASE_URL } from "../globals";

const generateBody = (inputs: DeployUpRequest) => {
  const encodedLsp3Profile =
    typeof inputs?.lsp3ProfileMetadata === "string"
      ? inputs?.lsp3ProfileMetadata
      : encodeVerifiableUri(inputs?.lsp3ProfileMetadata);

  const salt = "0x" + crypto.randomBytes(32).toString("hex");
  const postDeploymentCallData = generatePostDeploymentCallData(
    inputs.lsp6ControllerAddress,
    encodedLsp3Profile
  );

  return {
    salt,
    postDeploymentCallData,
  };
};

const main = async () => {
  checkEnvVariables();

  const inputs = await checkInputVariables();

  const body = generateBody(inputs);

  let response;
  try {
    console.log("⏳ Sending Universal Profile deployment request ...");
    response = await axios.post(RELAYER_BASE_URL + "/universal-profile", body, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const { universalProfileAddress, transactionHash, taskUuid } =
      response?.data as DeployUpResponse;

    console.log(
      `🎉 Successfully sent transaction: https://explorer.execution.testnet.lukso.network/tx/${transactionHash}`
    );
    console.log(
      `🆙 Universal Profile deployed at address ${universalProfileAddress} Track your task with this uuid ${taskUuid} `
    );
  } catch (error: any) {
    console.log(
      `❌ Error executing /universal-profile endpoint: ${error?.response?.data?.message}`
    );
    return;
  }
};

main()
  .then(() => {
    console.log("✅Done.");
  })
  .catch((error: any) => {
    console.log("❌", error);
  });
