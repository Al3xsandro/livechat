import { application } from "@infra/app";

const port = process.env.PORT || 5000;

application.listen(port, () => {
  console.log(`server started on ${port}`);
});
