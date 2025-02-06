import Nango from "@nangohq/frontend";

const nangoFrontend = new Nango({
  publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_KEY as string,
});

export default nangoFrontend;
