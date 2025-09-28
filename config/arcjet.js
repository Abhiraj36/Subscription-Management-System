import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: NODE_ENV === "development" ? "DRY_RUN" : "LIVE", // DRY_RUN in dev
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // You can add more allowed bot categories if needed
      ],
    }),
    tokenBucket({
      mode: NODE_ENV === "development" ? "DRY_RUN" : "LIVE", // DRY_RUN in dev
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
