import { server } from "@infra/app";

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server started on ${port}`);
});
