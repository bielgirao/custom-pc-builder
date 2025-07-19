import { v4 as uuidv4 } from "uuid";
import { UUID, asUUID } from "../types/uuid";

export function generateUUID(): UUID {
  return asUUID(uuidv4());
}