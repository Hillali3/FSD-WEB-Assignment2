const request = require("supertest");
import { UUID } from "crypto";
import { Express } from "express";
import mongoose from "mongoose";
import User from "../../models/user";
import initApp from "../../server";
// import { users } from "./usersTestsData";

let app: Express;
let accessToken: string;
let userId: UUID;

const newUser = {
  username: "hila.ohana",
  name: "hila",
  email: "hila@example.com",
  password: "pass",
};

beforeAll(async () => {
  app = await initApp();
  await User.deleteMany();
  const res = await request(app).post("/auth/register").send(newUser);
  accessToken = res.body.accessToken;
  userId = res.body.userId;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Users Test", () => {
  // test("Create User", async () => {
  //   const response = await request(app)
  //     .post("/users/")
  //     .send({ newUser })
  //     .set("Authorization", `Bearer ${accessToken}`);
  //   userId = response.body._id;
  //   expect(response.status).toBe(201);
  //   expect(response.body.username).toBe(newUser.username);
  //   expect(response.body.name).toBe(newUser.name);
  //   expect(response.body.password).toBe(newUser.password);
  //   expect(response.body.email).toBe(newUser.email);
  // });
  test("Get All Users", async () => {
    const response = await request(app)
      .get("/users/")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get User by ID", async () => {
    const response = await request(app)
      .get(`/users/id/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test("Update User", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "New Name" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New Name");
  });
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
