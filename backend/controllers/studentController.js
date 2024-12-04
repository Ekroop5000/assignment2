import students from '../data/studentData.js';

export const getAllStudents = (req, res) => res.json(students);

export const getStudentById = (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
};