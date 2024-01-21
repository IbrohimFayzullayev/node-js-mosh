const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/mongo-exercises`)
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.log(`Couldn't connect to Mongodb...`, err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
