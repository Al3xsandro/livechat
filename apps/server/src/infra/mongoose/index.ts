import { connect } from "mongoose";

export default async (): Promise<void> => {
  try {
    await connect(`${process.env.MONGO_SRV || ""}`, {
      dbName: "nome_sobrenome",
    });
  } catch (err) {
    console.error(err);
  }
};
