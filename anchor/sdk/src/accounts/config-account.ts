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

export type CreateConfigData = {
  escrowId: number;
  settlementAmount: number;
}

export type CreateConfigProgramData = {
  escrowId: number;
  settlementAmount: BN;
}

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
  status: StatusProgram;
  escrowId: number;
  settlementAmount: BN;
};

export type UpdateConfigProgramData = {
  newStatus: StatusProgram;
  newSettlementAmount: BN;
  newAuthority: PublicKey;
};

export enum Status {
  Pending = 0,
  Active = 1,
  Cancelled = 2,
  Complete = 3,
}

export type StatusProgram =
  | { pending: {} }
  | { active: {} }
  | { cancelled: {} }
  | { complete: {} };

export const convertCreateConfigDataToProgramData = (data: CreateConfigData): CreateConfigProgramData => {
  return {
    escrowId: data.escrowId,
    settlementAmount: new BN(data.settlementAmount),
  };
}

export const convertConfigDataToProgramData = (data: ConfigData): ConfigProgramData => {
  const status = statusToProgramStatus(data.status);
  
  return {
    authority: new PublicKey(data.authority),
    creationTimestamp: new BN(data.creationTimestamp),
    status,
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
  
  const newStatus = statusToProgramStatus(data.newStatus);
  
  return {
    newStatus,
    newSettlementAmount: new BN(data.newSettlementAmount),
    newAuthority: new PublicKey(data.newAuthority),
  };
};

export const convertUpdateConfigProgramDataToData = (programData: UpdateConfigProgramData): UpdateConfigData => {
  
  const newStatus = programToStatus(programData.newStatus);
  
  return {
    newStatus,
    newSettlementAmount: programData.newSettlementAmount.toNumber(),
    newAuthority: programData.newAuthority.toString(),
  };
};

export function programToStatus(programStatus: StatusProgram): Status {
  if ("pending" in programStatus) {
    return Status.Pending;
  } else if ("active" in programStatus) {
    return Status.Active;
  } else if ("cancelled" in programStatus) {
    return Status.Cancelled;
  } else if ("complete" in programStatus) {
    return Status.Complete;
  } else {
    throw new Error("Invalid Status value");
  }
}

export function statusToProgramStatus(status: Status): StatusProgram {
  switch (status) {
    case Status.Pending:
      return { pending: {} };
    case Status.Active:
      return { active: {} };
    case Status.Cancelled:
      return { cancelled: {} };
    case Status.Complete:
      return { complete: {} };
    default:
      throw new Error("Invalid Status value");
  }
}

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
    status: fetchedData.status,
    escrowId: fetchedData.escrowId,
    settlementAmount: fetchedData.settlementAmount,
  };
  return convertConfigProgramDataToData(programData);
}

export async function getConfig(program: Program<Tokenescrow>, configPubkey: PublicKey) {
    return await program.account.config.fetch(configPubkey);
}
  