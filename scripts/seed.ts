import { connectToDb } from "../lib/db.js";
import Category from "../lib/models/category.model.js";

// const connectToDb  = require("../lib/db.ts");
// const Category = require("../lib/models/category.model.ts")

async function main() {
  try {
    await connectToDb();
    await Category.insertMany([
      { name: "Computer Science" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Photography" },
      { name: "Accounting" },
      { name: "Engineering" },
      { name: "Filming" },
    ]);
    console.log("success");
  } catch (error) {
    console.log("Error Seeding the dataBase Categies ", error);
  }
}
main();
