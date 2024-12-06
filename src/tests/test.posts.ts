const request = require("supertest");
const app = require("../src/index");
const mongoose = require("mongoose");
import Post from "../models/post";
import User from "../models/user";

import { posts, users } from "./test_posts";

beforeAll(async () => {
  await Post.deleteMany();
  await User.deleteMany();
  await User.create({
    name: users[0].name,
    email: users[0].email,
  });
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("Posts Test", () => {
  test("Create new user", async () => {
    const response = await request(app).post("/users").send(users[0]);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(users[0].name);
    expect(response.body.email).toBe(users[0].email);
    const userId = response.body._id;
  });
  test("Create a new post", async () => {
    const response = await request(app).post("/posts").send(posts[0]);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(posts[0].title);
    expect(response.body.content).toBe(posts[0].content);
    expect(response.body.userId).toBe(userId);
  });
  test("Get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Get post by id", async () => {
    const post = await Post.findOne();
    const response = await request(app).get(`/posts/${post._id}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(post._id.toString());
  });
  test("Get post by user id", async () => {
    const response = await request(app).get("/posts/user/123");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("Update post", async () => {
    const post = await Post.findOne();
    const response = await request(app).put(`/posts/${post._id}`).send({
      title: "Updated Post",
      content: "This is an updated post",
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Post");
  });
  test("Delete post", async () => {
    const post = await Post.findOne();
    const response = await request(app).delete(`/posts/${post._id}`);
    expect(response.status).toBe(200);
  });
});
