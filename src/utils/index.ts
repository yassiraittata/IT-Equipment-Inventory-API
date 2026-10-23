import crypto from "node:crypto";

export function generateSerialNumber(): string {
  return `EQP-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
}
