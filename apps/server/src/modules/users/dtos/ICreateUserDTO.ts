import { z } from "zod";

const cpfRegex =
  /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;

export const userSchema = z.object({
  cpf: z.string().regex(cpfRegex),
  password: z.string(),
});

export type ICreateUserDTO = z.infer<typeof userSchema>;
