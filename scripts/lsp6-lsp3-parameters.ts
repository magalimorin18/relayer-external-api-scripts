import axios from "axios";
import { DeployUpRequest, DeployUpResponse } from "../interface";
import { encodeVerifiableUri } from "../utils/encode-verifiable-uri";
import { checkEnvVariables } from "../utils/check-env-variables";
import { checkInputVariables } from "../utils/check-input-variables";
import { API_KEY, RELAYER_BASE_URL } from "../globals";

const generateBody = (inputs: DeployUpRequest) => {
  let encodedLsp3Profile: string;
  if (inputs?.lsp3ProfileMetadata) {
    encodedLsp3Profile =
      typeof inputs?.lsp3ProfileMetadata === "string"
        ? inputs?.lsp3ProfileMetadata
        : encodeVerifiableUri(inputs?.lsp3ProfileMetadata);

    return {
      lsp6ControllerAddress: inputs?.lsp6ControllerAddress,
      lsp3Profile: encodedLsp3Profile,
    };
  }

  return {
    lsp6ControllerAddress: inputs?.lsp6ControllerAddress,
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
