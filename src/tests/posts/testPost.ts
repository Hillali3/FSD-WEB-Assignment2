const request = require("supertest");
import { app } from "../../index";
import Post from "../../models/post";
import User from "../../models/user";
import mongoose from "mongoose";
import { posts, user as userTest } from "./testPostData";
import { UUID } from "crypto";

let accessToken: string;
let userID: UUID;
let postID: UUID;
request(app).use("/post");

beforeAll(async () => {
  console.log("beforeAll");
  Post.deleteMany();
  const res = await request(app).post("/auth/register").send(userTest);
  accessToken = res.body.accessToken;
  userID = res.body.userID;
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
      .send({ ...posts[0], userID })
      .set("Authorization", `Bearer ${accessToken}`);
    postID = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(posts[0].title);
    expect(response.body.content).toBe(posts[0].content);
    expect(response.body.userID).toBe(userID);
  });
  test("Get All Posts", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get Post by ID", async () => {
    const response = await request(app)
      .get(`/id/${postID}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(posts[0].title);
    expect(response.body.content).toBe(posts[0].content);
    expect(response.body.userID).toBe(userID);
  });
  test("Update Post", async () => {
    const response = await request(app)
      .put(`/${postID}`)
      .send({ title: "New Title" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("New Title");
  });
  test("Get All Posts by User ID", async () => {
    const response = await request(app)
      .get(`/userId/${userID}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get All Posts by Username", async () => {
    const response = await request(app)
      .get(`/username/${userTest.username}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Delete Post", async () => {
    const response = await request(app)
      .delete(`/${postID}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });
  test("Get All Posts after Delete", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
