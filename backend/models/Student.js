class Student {
    constructor(id, name, department, semester, enrolledCourses = [], completedCourses = []) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.semester = semester;
        this.enrolledCourses = enrolledCourses;
        this.completedCourses = completedCourses;
    }
}

module.exports = Student;