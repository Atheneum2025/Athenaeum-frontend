import React, { useEffect, useState } from 'react';
import header from '../Header/Header.module.css';

type Course = {
  _id: string;
  coursename: string;
  description: string;
  // subjects: any[]; // Adjust the type if `subjects` has a specific structure
};

type Subject = {
  _id: string;
  subjectname: string;
  description: string;
  // subjects: any[]; // Adjust the type if `subjects` has a specific structure
};

type Unit = {
  _id: string;
  unitname: string;
  description: string;
  // subjects: any[]; // Adjust the type if `subjects` has a specific structure
};

type Material = {
  _id: string;
  materialname: string;
  description: string;
  // subjects: any[]; // Adjust the type if `subjects` has a specific structure
};

export default function SearchBar() {

  const [search, setSearch] = useState<string>("");
  const [courseSearchData, setCourseSearchData] = useState<Course[]>([]);
  const [subjectSearchData, setSubjectSearchData] = useState<Subject[]>([]);
  const [unitSearchData, setUnitSearchData] = useState<Unit[]>([]);
  const [materialSearchData, setMaterialSearchData] = useState<Material[]>([]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

  };

  useEffect(() => {

    const fetchSearchResults = async () => {

      if (search !== "") {

        try {

          const [courseResponse, subjectResponse, unitResponse, materialResponse] = await Promise.all([
            fetch('http://localhost:3000/api/v1/course'),
            fetch('http://localhost:3000/api/v1/subject'),
            fetch('http://localhost:3000/api/v1/unit'),
            fetch('http://localhost:3000/api/v1/material')
          ]);

          const [courseData, subjectData, unitData, materialData] = await Promise.all([
            courseResponse.json(),
            subjectResponse.json(),
            unitResponse.json(),
            materialResponse.json(),
          ]);

          // console.log(courseData.courses.
            
          //   filter((course: Course) =>
          //     course.coursename.toLowerCase().includes(search.toLowerCase())
          //   )
          // );

          // setCourseSearchData(courseData.courses);
          // setSubjectSearchData(subjectData.subjects);
          // setUnitSearchData(unitData.units);
          // setMaterialSearchData(materialData.materials);

          setCourseSearchData(
            courseData.courses.filter((course: Course) =>
              course.coursename.toLowerCase().includes(search.toLowerCase())
            )
          );
          setSubjectSearchData(
            subjectData.subjects.filter((subject: Subject) =>
              subject.subjectname.toLowerCase().includes(search.toLowerCase())
            )
          );
          setUnitSearchData(
            unitData.units.filter((unit: Unit) =>
              unit.unitname.toLowerCase().includes(search.toLowerCase())
            )
          );
          setMaterialSearchData(
            materialData.materials.filter((material: Material) =>
              material.materialname.toLowerCase().includes(search.toLowerCase())
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
       
      }
      else {
        setCourseSearchData([]);
        setSubjectSearchData([]);
        setUnitSearchData([]);
        setMaterialSearchData([])
      }
    }

    fetchSearchResults();
  }, [search])
  return (
    <>
      <div className={header.search_bar}>
        <input type="search" placeholder="search here.." value={search} onChange={handleSearch} />

        <div className={header.search_bar_results}>
          Recents :
          Results :
          Courses :
          {
            courseSearchData.map((course) => (
              <li key={course._id}>
                {course.coursename}
              </li>
            ))
          }
          Subjects :
          {
            subjectSearchData.map((subject) => (
              <li key={subject._id}>
                {subject.subjectname}
              </li>
            ))
          }
          Units :
          {
            unitSearchData.map((unit) => (
              <li key={unit._id}>
                {unit.unitname}
              </li>
            ))
          }
          Materials :
          {
            materialSearchData.map((material) => (
              <li key={material._id}>
                {material.materialname}
              </li>
            ))
          }
          {/* <ul>
                <div>Courses</div>
                <li>BCA</li>
                <li>BBA</li>
                <li>BSC</li>
              </ul>
              <ul>
                <div>Subjects</div>
                <li>PSPC</li>
                <li>DC</li>
                <li>MATHS</li>
              </ul>
              <ul>
                <div>Units</div>
                <li>unit one</li>
                <li>unit two</li>
              </ul>
              <ul>
                <div>Materials</div>
                <li>material one</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
              </ul>
              <ul>
                <div>Professors</div>
                <li>p 1</li>
                <li>p 2</li>
              </ul> */}
        </div>
      </div>
    </>
  )
}
