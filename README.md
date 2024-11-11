# Relayer external api scripts

This repository presents ready to use scripts in order to use the external api endpoint of the Relayer.

## Set up

### Environment variables

`cp .env.example .env`

`RELAYER_BASE_URL`: url of the relayer. Can be testnet or mainnet.

Testnet: `https://relayer-api.testnet.lukso.network/v1/relayer`

Mainnet:`https://relayer-api.mainnet.lukso.network/v1/relayer`

`API_KEY`: your developer api key. Given to you by the backend team of LUKSO.

### Dependencies

`npm i`

## Deploy Universal Profile

Update the `scripts/inputs.json` file with the LSP6 controller address and the LSP3 profile metadata you would like to set on your deployed universal profile.

The `scripts/inputs.json` should look like:

```
{
  "lsp6ControllerAddress": // List of LSP6 controller addresses,
  "lsp3ProfileMetadata": {
    "lsp3ProfileJson": {
     // Your LSP3 profile metadata as a JSON
    },
    "ipfsUrl": // The ipfs address where your JSON file is hosted
  }
}
```

### LSP6 and LSP3 parameters

`npm run lsp6-lsp3-parameters`

### Salt and PostDeploymentCallData parameters

Useful to deploy a cross chain Universal Profile by keeping the salt.

`npm run salt-post-deployment-call-data-parameters`
