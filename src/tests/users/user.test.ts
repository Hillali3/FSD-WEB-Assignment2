const request = require("supertest");
import { UUID } from "crypto";
import { Express } from "express";
import mongoose from "mongoose";
import User from "../../models/user";
import initApp from "../../server";
import { users } from "./usersTestsData";

let app: Express;
let accessToken: string;
let userId: UUID;

beforeAll(async () => {
  app = await initApp();
  await User.deleteMany();
  const res = await request(app).post("/auth/register").send(userTest);
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
      .send({ ...users[0] })
      .set("Authorization", `Bearer ${accessToken}`);
    userId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(users[0].username);
    expect(response.body.name).toBe(users[0].name);
    expect(response.body.password).toBe(users[0].password);
    expect(response.body.email).toBe(users[0].email);
  });
  test("Get All Users", async () => {
    const response = await request(app)
      .get("/users/")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get User by ID", async () => {
    const response = await request(app)
      .get("/users/id/${userId}")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(users[0].username);
    expect(response.body.name).toBe(users[0].name);
    expect(response.body.password).toBe(users[0].password);
    expect(response.body.email).toBe(users[0].email);
  });
  test("Update Post", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({ title: "New Title" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("New Title");
  });
  test("Get All Posts by User ID", async () => {
    const response = await request(app)
      .get(`/posts/userId/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get All Posts by Username", async () => {
    const response = await request(app)
      .get(`/posts/username/${userTest.username}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Delete Post", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });
  test("Get All Posts after Delete", async () => {
    const response = await request(app)
      .get("/posts/")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
