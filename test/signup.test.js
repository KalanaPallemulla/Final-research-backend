const request = require("supertest");
const app = require("../index");

describe("POST /signup", () => {
  it("should create a new user and return 200 status code", async () => {
    const newUser = {
      fullName: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "password",
    };

    const response = await request(app).post("/api/signup").send(newUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe("User added");
  });

  it("should return a 500 status code if there is an error", async () => {
    const newUser = {
      fullName: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "password",
    };

    // Force an error by passing an invalid email
    newUser.email = "invalid-email";

    const response = await request(app).post("/api/signup").send(newUser);

    expect(response.status).toBe(500);
    expect(response.text).toContain("Sign up error:");
  });
});
