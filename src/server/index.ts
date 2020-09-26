import express, { Express } from "express";

export interface APIIndexRouteResponse {
  message: string;
}

export function configureServer(app: Express) {
  app.get("/api/v1", (_, res) => {
    const response = { message: "Hello world!" } as APIIndexRouteResponse;
    res.json(response);
  });
}

export function createConfiguredServer(): Express {
  const app = express();
  configureServer(app);
  return app;
}
