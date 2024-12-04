import courses from '../data/courseData.js';

export const getAllCourses = (req, res) => {
  res.json(courses);
};

export const addCourse = (req, res) => {
  const { id, name, department, isOpen } = req.body;
  const newCourse = { id, name, department, isOpen };
  courses.push(newCourse);
  res.status(201).json(newCourse);
};