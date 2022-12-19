class SignupsModel {
  constructor(
    schoolid = "",
    username = "",
    firstname ='',
    lastname ='',
    dob ='',
    cin ='',
    phonenumber ='',
    email = "",
    password = "",
    role = ""
  ) 
  {
    this.schoolid = schoolid;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dob = dob;
    this.cin = cin;
    this.phonenumber = phonenumber;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export default SignupsModel;
