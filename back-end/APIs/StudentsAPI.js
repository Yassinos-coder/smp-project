const { Router } = require("express");
const StudentsAccountsDBModel = require("../DB/StudentsAccountsDBModel");
const router = Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const passGen = require("generate-password");
let SaltRounds = 10;

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "castroyassine0@gmail.com",
    pass: 'qrgjfuadljwwrjpo',
  },
});

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

router.post("/profilePictureUpload/:studentid", async (req, res) => {
  let student_id = req.params.studentid;
  const file = req.files.image;
  const path = `uploads/Students/${student_id}`;

  file.mv(path, async (err) => {
    if (err) {
      console.log(err);
    } else {
      await StudentsAccountsDBModel.updateOne(
        {_id: student_id},
        {profile_pic: student_id}
      );
      console.log(
        `Student with ID: ${student_id} uploaded a file: ${file.name}`
      );
    }
  });
});

router.post("/genNewPass/:studentID/:StudentEmail", async (req, res) => {
  let studentID = req.params.studentID;
  let StudentEmail = req.params.StudentEmail

  try {
    let pass = passGen.generate();
    bcrypt.genSalt(SaltRounds, async (err, salt) => {
      bcrypt.hash(pass, salt, async (err, hash) => {
        await StudentsAccountsDBModel.updateOne(
          {_id: studentID},
          {password: hash},
        );
        let mailDetails = {
          from: "smp.newpass@gmail.com",
          to: StudentEmail,
          subject: "New Password Generated By Request",
          text: `Your new Password is => ${pass}`,
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {console.log("Error Occurs", err);}
        });
      });
    });
  } catch (err) {
    console.error("Error in genNewPass", err);
  }
});

module.exports = router;
