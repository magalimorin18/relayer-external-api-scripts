import { DeployUpRequest } from "../interface";

export const checkInputVariables = async () => {
  const filePath = "../scripts/inputs.json";
  console.log("📁 Loading LSP6 and LSP3 parameters from path:", filePath);
  const inputs: DeployUpRequest = await import(filePath);

  if (
    !inputs?.lsp6ControllerAddress ||
    inputs?.lsp6ControllerAddress.length === 0
  ) {
    throw new Error(
      "No lsp6ControllerAddress provided in the inputs variable."
    );
  }

  return inputs;
};
