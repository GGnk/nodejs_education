print("Started Adding the Users.");
db = db.getSiblingDB("admin");
db.auth({ user: "root", pwd: "root_example" });
db.adminCommand({
  createUser: "user",
  pwd: "user_example",
  roles: [{ role: "readWrite", db: "admin" }],
});

print("End Adding the User Roles.");
