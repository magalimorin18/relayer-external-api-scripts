import { Permissions } from "@erc725/erc725.js";

/**
 * Default permissions a controller address is granted on a Users Universal Profile.
 *
 * These can be updated by the user later.
 */
export const DEFAULT_CONTROLLER_PERMISSIONS: Permissions = {
  ADDCONTROLLER: true,
  EDITPERMISSIONS: true,
  SUPER_TRANSFERVALUE: true,
  SUPER_CALL: true,
  SUPER_STATICCALL: true,
  DEPLOY: true,
  SUPER_SETDATA: true,
  ENCRYPT: true,
  DECRYPT: true,
  SIGN: true,
  CALL: true,
  STATICCALL: true,
  SETDATA: true,
  TRANSFERVALUE: true,
  EXECUTE_RELAY_CALL: true,
};
