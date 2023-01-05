const { Router } = require("express");
const StudentsAccountsDBModel = require("../DB/StudentsAccountsDBModel");
const router = Router();


router.post("/AddStudent", async (req, res) => {
  let student = req.body;
  try {
    const newStudent = new StudentsAccountsDBModel(student);
    let updatedStudentList = await newStudent.save();
    res.send(updatedStudentList);
    console.log("Student Inserted !");
  } catch (err) {
    console.error(err);
  }
});

router.get("/GetStudents", async (req, res) => {
  let students = await StudentsAccountsDBModel.find();
  if (students) {
    res.send(students);
  } else {
    console.log("No Students in DB");
  }
});

router.post("/DeleteStudent/:student_id", async (req, res) => {
  let student_id = req.params.student_id;

  try {
    await StudentsAccountsDBModel.deleteOne({ _id: student_id });
    const UpdateStudentList = await StudentsAccountsDBModel.find({});
    res.send(UpdateStudentList);
  } catch (err) {
    console.error("Error regarding DeleteStudent API", err);
  }
});

router.post('/profilePictureUpload',  (req, res) => {

});

module.exports = router;
