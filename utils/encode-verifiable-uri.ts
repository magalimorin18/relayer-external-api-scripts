import ERC725, { ERC725JSONSchema } from "@erc725/erc725.js";
import { ethers } from "ethers";
import LSP3Schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

export const encodeVerifiableUri = (lsp3ProfileMetadata: any) => {
  const lsp3ProfileJson = lsp3ProfileMetadata.lsp3ProfileJson;
  const ipfsUrl = lsp3ProfileMetadata.ipfsUrl;

  const hashedLsp3ProfileJson = ethers.keccak256(
    ethers.toUtf8Bytes(lsp3ProfileJson.toString())
  );

  const myErc725 = new ERC725(LSP3Schema as ERC725JSONSchema[]);

  const verifiableUri = myErc725.encodeDataSourceWithHash(
    {
      method: "keccak256(utf8)",
      data: hashedLsp3ProfileJson,
    },
    ipfsUrl
  );

  return verifiableUri;
};
