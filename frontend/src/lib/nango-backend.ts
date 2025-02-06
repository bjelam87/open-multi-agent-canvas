import { Nango } from "@nangohq/node";

const nangoBackend = new Nango({
  secretKey: process.env.NANGO_SECRET_KEY!,
});

export default nangoBackend;
