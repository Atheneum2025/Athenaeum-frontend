import axios from 'axios';
import React, { useState } from 'react'

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

type CourseFormProps = {
    course: CourseType;
    onUpdate: () => void;
    onDelete: () => void;
};
export default function DeleteNUpdate({ course, onUpdate, onDelete }: CourseFormProps) {
    const [formData, setFormData] = useState({ coursename: course.coursename, description: course.description });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update course
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/api/v1/course/${course._id}`, formData);
            alert("Course updated successfully!");
            onUpdate(); // Refresh courses
        } catch (error) {
            console.error(error);
            alert("Failed to update course.");
        }
    };

    // Delete course
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/course/${course._id}`);
                alert("Course deleted successfully!");
                onDelete(); // Refresh courses
            } catch (error) {
                console.error(error);
                alert("Failed to delete course.");
            }
        }
    };
  return (
    <>
          <div className="course_form">
              <h3>Edit Course</h3>
              <input
                  type="text"
                  name="coursename"
                  value={formData.coursename}
                  onChange={handleChange}
                  placeholder="Course Name"
              />
              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Course Description"
              ></textarea>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete} style={{ backgroundColor: "red" }}>
                  Delete
              </button>
          </div>
    </>
  )
}
