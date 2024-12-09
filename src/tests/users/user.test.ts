const request = require("supertest");
import { UUID } from "crypto";
import { Express } from "express";
import mongoose from "mongoose";
import User from "../../models/user";
import initApp from "../../server";
import { user } from "./usersTestsData";

let app: Express;
let accessToken: string;
let userId: UUID;

beforeAll(async () => {
  app = await initApp();
  await User.deleteMany();
  const res = await request(app).post("/auth/register").send(user);
  accessToken = res.body.accessToken;
  userId = res.body.userId;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Users Test", () => {
  test("Create User", async () => {
    const response = await request(app)
      .post("/users/")
      .send({ user })
      .set("Authorization", `Bearer ${accessToken}`);
    userId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(user.username);
    expect(response.body.name).toBe(user.name);
    expect(response.body.password).toBe(user.password);
    expect(response.body.email).toBe(user.email);
  });
  // test("Get All Users", async () => {
  //   const response = await request(app)
  //     .get("/users/")
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBe(1);
  // });
  // test("Get User by ID", async () => {
  //   const response = await request(app)
  //     .get(`/users/id/${userId}`)
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body.username).toBe(user.username);
  //   expect(response.body.name).toBe(user.name);
  //   expect(response.body.email).toBe(user.email);
  // });
  // test("Update User", async () => {
  //   const response = await request(app)
  //     .put(`/users/${userId}`)
  //     .send({ name: "New Name" })
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body.name).toBe("New Name");
  // });
  // test("Delete User", async () => {
  //   const response = await request(app)
  //     .delete(`/users/${userId}`)
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(response.status).toBe(200);
  // });
  // test("Get All Users after Delete", async () => {
  //   const response = await request(app)
  //     .get("/users/")
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBe(0);
  // });
});
