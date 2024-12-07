const request = require("supertest");
import { app } from "../../index";
import Post from "../../models/post";
import User from "../../models/user";
import mongoose from "mongoose";
import { posts, user as userTest } from "./testPostData";
import exp from "constants";

let accessToken: string;

beforeAll(async () => {
  console.log("beforeAll");
  Post.deleteMany();
  const res = await request(app).post("/auth/register").send(userTest);
  accessToken = res.body.accessToken;
});

afterAll(() => {
  console.log("afterAll");
  Post.deleteMany();
  User.deleteMany();
  mongoose.connection.close();
});

describe("Posts Test", () => {
  test("Create Post", async () => {
    const response = await request(app)
      .post("/")
      .send(posts[0])
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(posts[0].title);
    expect(response.body.content).toBe(posts[0].content);
  });
  test("Get All Posts", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get Post by ID", async () => {
    const response = await request(app).get(`/${posts[0]}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(posts[0].title);
    expect(response.body.content).toBe(posts[0].content);
  });
});
