import express, { Express } from "express";
import * as admin from "firebase-admin";

export interface APIIndexRouteResponse {
  message: string;
}

export interface APIListTodoRouteResponse {
  status: string;
  data: Todo[];
}

export interface APICreateTodoRouteResponse {
  status: string;
  data: Todo;
}

export interface TodoData {
  title: string;
  isCompleted: boolean;
}
export interface Todo extends TodoData {
  id: string;
}

export function configureServer(app: Express) {
  app.use(express.json());

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://playground-ace42.firebaseio.com"
  });
  const firestore = admin.firestore();
  if (process.env.NODE_ENV?.startsWith("dev")) {
    firestore.settings({
      host: "localhost:8080",
      ssl: false
    });
  }

  app.get("/api/v1", (_, res) => {
    const response = { message: "Hello world!" } as APIIndexRouteResponse;
    res.json(response);
  });

  app.get("/api/v1/todos", async (_, res) => {
    const docs = await firestore.collection("todos").get();
    const todos: Todo[] = docs.docs.map(d => ({
      id: d.id,
      ...(d.data() as TodoData)
    }));

    res.json({
      status: "SUCCESS",
      data: todos
    } as APIListTodoRouteResponse);
  });

  app.post("/api/v1/todos", async (req, res) => {
    const { body } = req;
    const newTodo = {
      title: body.title,
      isCompleted: false
    };
    const newDoc = await firestore.collection("todos").add(newTodo);
    res.json({
      status: "SUCCESS",
      data: {
        id: newDoc.id,
        ...newTodo
      }
    } as APICreateTodoRouteResponse);
  });
}

export function createConfiguredServer(): Express {
  const app = express();
  configureServer(app);
  return app;
}
