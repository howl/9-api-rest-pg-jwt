const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("✔️  Connected to the Mongo Database");
  } catch (error) {
    console.log(error);
    throw "❌ Error connecting to the Mongo Database";
  }
};

module.exports = dbConnect;
