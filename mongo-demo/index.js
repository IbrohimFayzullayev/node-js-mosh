const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/playground`)
  .then(() => console.log(`Connected to Mongodb...`))
  .catch((err) => console.log(`Couldn't connect to Mongodb...`, err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
// createCourse();
async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  const pageNumber = 1;
  const pageSize = 10;

  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find({ isPublished: true, tags: "backend" })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}
// getCourses();

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(course);
}
// updateCourse("65472ae17068c12794ff85d0");

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);

  console.log(course);
}
removeCourse("65472cc7a270b1c7f9b502ca");
