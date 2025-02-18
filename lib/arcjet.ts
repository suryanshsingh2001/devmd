import arcjet, {fixedWindow} from "@arcjet/next"

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    characteristics: ["ip.src"], // track requests by IP address
    rules: [
      fixedWindow({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        window: "86400s", // 1 day fixed window
        max: 5, // allow a maximum of 100 requests
      }),
    ],
  });


export default aj;