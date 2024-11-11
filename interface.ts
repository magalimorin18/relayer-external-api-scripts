export interface DeployUpRequest {
  lsp6ControllerAddress: string[];
  lsp3ProfileMetadata?: any;
}

export interface DeployUpResponse {
  universalProfileAddress: string;
  taskUuid: string;
  transactionHash: string;
}
