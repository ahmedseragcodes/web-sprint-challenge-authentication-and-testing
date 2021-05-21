const Users = require("./auth/auth-model");
const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");
const bcrypt = require("bcryptjs");

beforeAll(async()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async()=>{
  await db("users").truncate();
});
afterAll(async()=>{
  await db.destroy();
});


describe("POST Registration", ()=>{
  
  it("registers new user", async()=>{

    let initialUsers = await db("users")
    expect(initialUsers).toHaveLength(0);

    let newUser = {username: "Alexander2", password: "Alexander2"};

    const hash = bcrypt.hashSync(newUser.password);

    newUser.password = hash;

    request(server).post("/api/auth/register").send(newUser);
    
    let res = await db("users");
    expect(res).toHaveLength(1);


  })
})
describe("POST Registration With Existing User", ()=>{
  
beforeEach(async()=>{
  await db("users").insert({ username: "Alexander1", password: "1234" });
});

  it("registers new user in addition to existing", async()=>{

    let initialUsers = await db("users")
    expect(initialUsers).toHaveLength(1);

    const newUser = {username: "Admin1", password: "Admin1"};

    request(server).post("/api/auth/register").send(newUser);
    
    let res = await db("users");
    expect(res).toHaveLength(2);


  })
})
describe("POST Login", ()=>{
  
  
    it("logs in after creating new user", async()=>{
  
      let initialUsers = await db("users")
      expect(initialUsers).toHaveLength(0);
  
      const newUser = {username: "Admin1", password: "Admin1"};
  
      await db("users").insert(newUser);
      
      let res = await db("users");
      expect(res).toHaveLength(1);
  
      await request(server).post("/api/auth/login").send(newUser)
  
    })
  })
  describe("POST Login", ()=>{
  
    beforeEach(async()=>{
      await db("users").insert({ username: "Alexander1", password: "1234" });
    });
  
    it("logs in with existing user", async()=>{
  
      let initialUsers = await db("users")
      expect(initialUsers).toHaveLength(1);
  
      await request(server).post("/api/auth/login").send({ username: "Alexander1", password: "1234" })
  
    })
  })
  