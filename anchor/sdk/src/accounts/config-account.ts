import { Program } from "@coral-xyz/anchor";
import { Tokenescrow } from "@project/anchor";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { CONFIG_SEED } from "../constants";

//------------------------------------------------------- Data Types
// Config Data
export type ConfigData = {
  authority: string;
  creationTimestamp: number;
  status: Status;
  escrowId: number;
  settlementAmount: number;
};

//new_status: Status, new_settlement_amount: u64, new_authority: Pubkey
export type UpdateConfigData = {
  newStatus: Status;
  newSettlementAmount: number;
  newAuthority: string;
};

// Config Data with Program types
export type ConfigProgramData = {
  authority: PublicKey;
  creationTimestamp: BN;
  status: Status;
  escrowId: number;
  settlementAmount: BN;
};

export type UpdateConfigProgramData = {
  newStatus: Status;
  newSettlementAmount: BN;
  newAuthority: PublicKey;
};

export enum Status {
  Pending,
  Active,
  Cancelled,
  Complete,
}

export const convertConfigDataToProgramData = (data: ConfigData): ConfigProgramData => {
  return {
    authority: new PublicKey(data.authority),
    creationTimestamp: new BN(data.creationTimestamp),
    status: data.status,
    escrowId: data.escrowId,
    settlementAmount: new BN(data.settlementAmount),
  };
};

export const convertConfigProgramDataToData = (programData: ConfigProgramData): ConfigData => {
  return {
    authority: programData.authority.toString(),
    creationTimestamp: programData.creationTimestamp.toNumber(),
    status: Status[programData.status.toString().toUpperCase() as keyof typeof Status],
    escrowId: programData.escrowId,
    settlementAmount: programData.settlementAmount.toNumber(),
  };
};

export const convertUpdateConfigDataToProgramData = (data: UpdateConfigData): UpdateConfigProgramData => {
  return {
    newStatus: data.newStatus,
    newSettlementAmount: new BN(data.newSettlementAmount),
    newAuthority: new PublicKey(data.newAuthority),
  };
};

export const convertUpdateConfigProgramDataToData = (programData: UpdateConfigProgramData): UpdateConfigData => {
  return {
    newStatus: programData.newStatus,
    newSettlementAmount: programData.newSettlementAmount.toNumber(),
    newAuthority: programData.newAuthority.toString(),
  };
};

//------------------------------------------------------- Data Finders
export const findConfigAddress = (programId?: string): string => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CONFIG_SEED)],
    new PublicKey(programId || "")
  )[0].toString();
};

// ------------------------------------------------------- Data Fetchers
export async function getConfigData(program: Program<Tokenescrow>) {
  let configAddress = findConfigAddress(program.programId.toString());
  const fetchedData = await program.account.config.fetch(configAddress);
  const programData: ConfigProgramData = {
    authority: fetchedData.authority,
    creationTimestamp: fetchedData.creationTimestamp,
    status: Status[fetchedData.status.toString().toUpperCase() as keyof typeof Status],
    escrowId: fetchedData.escrowId,
    settlementAmount: fetchedData.settlementAmount,
  };
  return convertConfigProgramDataToData(programData);
}

export async function getConfig(program: Program<Tokenescrow>, configPubkey: PublicKey) {
    return await program.account.config.fetch(configPubkey);
}
  