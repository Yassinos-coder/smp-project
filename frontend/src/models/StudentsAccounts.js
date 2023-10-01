class StudentsAccounts {
    constructor (
        profile_pic= 'default_pp',
        firstname = '',
        lastname = '',
        dob = '',
        address = '',
        phonenumber = '',
        email = '',
        password = '',
        level = '',
        classroom_group = '',
        father_name = '',
        father_cin ='',
        mother_name ='',
        mother_cin = '',
    )
    {
        this.profile_pic = profile_pic
        this.firstname = firstname
        this.lastname = lastname
        this.dob = dob
        this.address = address
        this.phonenumber = phonenumber
        this.email = email
        this.password = password
        this.level = level
        this.classroom_group = classroom_group
        this.father_name = father_name
        this.father_cin = father_cin
        this.mother_name = mother_name
        this.mother_cin = mother_cin
    }
}

export default StudentsAccounts
