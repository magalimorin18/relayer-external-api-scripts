import ERC725, { ERC725JSONSchema } from "@erc725/erc725.js";
import { DEFAULT_CONTROLLER_PERMISSIONS } from "../constants";
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";
import LSP6Schema from "@erc725/erc725.js/schemas/LSP6KeyManager.json";
import { ethers } from "ethers";

export const generatePostDeploymentCallData = (
  lsp6Controllers: string[],
  lsp3Profile?: string
) => {
  const permissionData: {
    keyName: string;
    dynamicKeyParts?: string;
    value: string[] | string;
  }[] = [
    {
      keyName: "AddressPermissions[]",
      value: lsp6Controllers,
    },
  ];

  for (const controller of lsp6Controllers) {
    permissionData.push({
      keyName: "AddressPermissions:Permissions:<address>",
      dynamicKeyParts: controller,
      value: ERC725.encodePermissions(DEFAULT_CONTROLLER_PERMISSIONS),
    });
  }

  const erc725js = new ERC725(LSP6Schema as ERC725JSONSchema[]);
  const { keys, values } = erc725js.encodeData(permissionData);

  if (lsp3Profile) {
    keys.push(ERC725YDataKeys.LSP3.LSP3Profile);
    values.push(lsp3Profile);
  }

  const abiCoder = new ethers.AbiCoder();

  const postDeploymentCallData = abiCoder.encode(
    ["bytes32[]", "bytes[]"],
    [keys, values]
  );

  return postDeploymentCallData;
};
