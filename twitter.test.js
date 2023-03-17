const superTest = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");
const bcrypt = require("bcryptjs");
const usersModel = require("./api/users/users-model");
const tweetModel = require("./api/tweets/tweet-model");
const commentModel = require("./api/commet/commet-model");

test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("USERS TESTS", () => {
  test("[1] userlar geliyor mu", async () => {
    const users = await usersModel.getAll();
    expect(users).toBeDefined();
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty("name", "şirzat");
  });

  test("[2] eklenen user doğru formatta geliyor mu", async () => {
    const newUser = await usersModel.create({
      name: "şirzat",
      surname: "bilen",
      email: "sirzatbilen123@gmail.com",
      password: "5678",
    });
    expect(newUser).toBeDefined();
    expect(newUser).toMatchObject({
      name: "şirzat",
      surname: "bilen",
      email: "sirzatbilen123@gmail.com",
    });
  });

  test("[3] updated user doğru formatta dönüyor mu", async () => {
    const updatedUser = await usersModel.updateUser(1, {
      name: "şirzatlar",
      surname: "bilen",
      email: "sirzatbilen123@gmail.com",
    });
    expect(updatedUser).toMatchObject({
      name: "şirzatlar",
      surname: "bilen",
      email: "sirzatbilen123@gmail.com",
    });
  });
});

describe("TWEETS TESTS", () => {
  test("[1] tweetler geliyor mu", async () => {
    const tweets = await tweetModel.getAllTweet();
    expect(tweets).toBeDefined();
    expect(tweets).toHaveLength(1);
    expect(tweets[0]).toMatchObject({ user_id: 1, text: "merhaba dünya" });
  });

  test("[2] eklenen tweet doğru formatta geliyor mu", async () => {
    const newTweet = await tweetModel.createTweet({
      user_id: 1,
      text: "merhaba dünya",
    });
    expect(newTweet).toBeDefined();
    expect(newTweet).toMatchObject({ user_id: 1, text: "merhaba dünya" });
  });

  test("[3] updated tweet doğru formatta dönüyor mu", async () => {
    const updatedTweet = await tweetModel.updateTweet(1, {
      user_id: 1,
      text: "merhaba dünya",
    });
    expect(updatedTweet).toMatchObject({ user_id: 1, text: "merhaba dünya" });
  });
});

describe("COMMENTS TESTS", () => {
  test("[1] commentler geliyor mu", async () => {
    const comments = await commentModel.getAll();
    expect(comments).toBeDefined();
    expect(comments).toHaveLength(1);
    expect(comments[0]).toMatchObject({
      content: "hello word",
      user_id: 1,
      tweet_id: 1,
    });
  });

  test("[2] eklenen comment doğru formatta geliyor mu", async () => {
    const newComment = await commentModel.create({
      content: "hello word2",
      user_id: 1,
      tweet_id: 1,
    });
    expect(newComment).toBeDefined();
    expect(newComment[0]).toMatchObject({
      content: "hello word2",
      user_id: 1,
      tweet_id: 1,
    });
  });

  test("[3] updated comment doğru formatta dönüyor mu", async () => {
    const updatedComment = await commentModel.updateById(1, {
      content: "hello word234",
      user_id: 1,
      tweet_id: 1,
    });
    expect(updatedComment).toMatchObject({
      content: "hello word234",
      user_id: 1,
      tweet_id: 1,
    });
  });
});

describe("Users Test GET isteği", () => {
  it("[1] Doğru Sayıda Users Geliyor mu ", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/users")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  }, 1000);

  it("[2] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/users/5")
      .set("Authorization", token);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("kullanıcı bulunamadı.");
  }, 1000);
});

describe("Tweets Test GET isteği", () => {
  it("[1] Doğru Sayıda Tweets Geliyor mu ", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/tweets")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  }, 1000);

  it("[2] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/tweets/5")
      .set("Authorization", token);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("id bulunamadı");
  }, 1000);
});

describe("Comments Test GET isteği", () => {
  it("[1] Doğru Sayıda Comments Geliyor mu ", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/comments")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  }, 1000);

  it("[2] İstenilen id yoksa 404 hata kodu dönüyor", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NzkwNTg1NTMsImV4cCI6MTY3OTE0NDk1M30.3-Zc1Y1JIpOcm9SzKka3jZ7kKKgMsd24G3__kcPuWIY";
    const res = await superTest(server)
      .get("/api/comments/5")
      .set("Authorization", token);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("id bulunamadı");
  }, 1000);
});
