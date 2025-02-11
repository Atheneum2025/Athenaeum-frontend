import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import header from '../Header/Header.module.css';
import Unit from '../../pages/Units/Unit';

type CourseType = {
  _id: string;
  coursename: string;
  description: string;
  keywords: string;
};

type SubjectType = {
  _id: string;
  subjectname: string;
  description: string;
  course: string;
  keywords: string;
};

type UnitType = {
  _id: string;
  unitname: string;
  description: string;
  course: string;
  subject: string;
  keywords: string;
};

type MaterialType = {
  _id: string;
  materialname: string;
  description: string;
  course: string;
  subject: string;
  unit: string;
  keywords: string;
};

export default function SearchBar() {

  const [search, setSearch] = useState<string>("");
  const [courseSearchData, setCourseSearchData] = useState<CourseType[]>([]);
  const [subjectSearchData, setSubjectSearchData] = useState<SubjectType[]>([]);
  const [unitSearchData, setUnitSearchData] = useState<UnitType[]>([]);
  const [materialSearchData, setMaterialSearchData] = useState<MaterialType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // for recent searches
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // for key down events
  // const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // put to recents 
  const putToRecents = (coursename: string) => {
    // setRecentSearches(coursename);
    const updatedSearches = [coursename, ...recentSearches.filter((term) => term !== coursename)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    setSearch("");
  }

  const handleVisibility = () => {
    setIsVisible(false);
  }

  document.addEventListener("mousedown", (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  })
  useEffect(() => {


    const fetchSearchResults = async () => {

      if (search !== "") {

        try {


          const [courseResponse, subjectResponse, unitResponse, materialResponse] = await Promise.all([
            axios.get('http://localhost:3000/api/v1/course/c', { withCredentials: true }),
            axios.get('http://localhost:3000/api/v1/subject', { withCredentials: true }),
            axios.get('http://localhost:3000/api/v1/unit', { withCredentials: true }),
            axios.get('http://localhost:3000/api/v1/material', { withCredentials: true })
          ]);

          const courseData = courseResponse.data;
          const subjectData = subjectResponse.data;
          const unitData = unitResponse.data;
          const materialData = materialResponse.data;

          setCourseSearchData(
            courseData.courses.filter((course: CourseType) =>
              JSON.stringify(course).toLowerCase().includes(search.toLowerCase())
              // JSON.stringify(course).textContent().toLowerCase() === search.toLowerCase()
            )
          );
          setSubjectSearchData(
            subjectData.subjects.filter((subject: SubjectType) =>
              // subject.subjectname.toLowerCase().includes(search.toLowerCase())
              JSON.stringify(subject).toLowerCase().includes(search.toLowerCase())
            )
          );
          setUnitSearchData(
            unitData.units.filter((unit: UnitType) =>
              JSON.stringify(unit).toLowerCase().includes(search.toLowerCase())
            )
          );
          setMaterialSearchData(
            materialData.materials.filter((material: MaterialType) =>
              JSON.stringify(material).toLowerCase().includes(search.toLowerCase())
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

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if(event.key === "ArrowDown"){
  //     event.preventDefault();
  //     setCurrentIndex((prevIndex) => 
  //       prevIndex < courseSearchData.length - 1 ? prevIndex + 1 : prevIndex
  //     );
  //   }
  //   else if(event.key === "ArrowUp"){
  //     event.preventDefault();
  //     setCurrentIndex((prevIndex) => 
  //       prevIndex > 0 ? prevIndex - 1 : prevIndex
  //     )
  //   }
  //   else if(event.key === "Enter" && currentIndex !== -1){
  //     let text = String(courseSearchData[currentIndex].coursename)
  //     console.log(courseSearchData[currentIndex].coursename)
  //     setSearch(text)
  //     courseSearchData[currentIndex]
  //     setCurrentIndex(-1)
  //   }
  // }

  return (
    <>
      <div className={header.search_bar_section} ref={searchRef}>
        <div className={header.search_bar}>
          <input
            type="search"
            placeholder="search here..."
            value={search}
            maxLength={100}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsVisible(true)}
          // onKeyDown={handleKeyDown}
          />
          <button onClick={handleVisibility} className={header.cancel_btn}>x</button>
        </div>
        {
          isVisible && (
            <div className={header.search_bar_results}>
              {
                search == "" && (
                  <>
                    Recents :
                    {recentSearches.length > 0 && (
                      <ul >
                        {recentSearches.map((term, index) => (
                          <li
                            key={index}
                            onClick={() => putToRecents(term)}
                            style={{ borderBottom: index !== recentSearches.length - 1 ? "1px solid #ccc" : "none" }}
                          >
                            {term}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )
              }
              <div className={header.results}>Results :</div>
              <div className={header.results}>Courses :</div>
              {
                courseSearchData.map((course) => (
                  <li key={course._id} onClick={() => putToRecents(course.coursename)}>
                    <a href={`/course/${course.coursename.toUpperCase()}/subject`}>
                      {course.coursename}
                    </a>
                    <pre className={header.hidden_keywords}>{course.description}</pre>
                    <pre className={header.hidden_keywords}>{course.keywords}</pre>
                  </li>
                ))
              }
              <div className={header.results}>Subjects :</div>
              {
                subjectSearchData.map((subject) => (
                  <li key={subject._id} onClick={() => putToRecents(subject.subjectname)}>
                    <a href={`/course/${subject.course.toUpperCase()}/subject/${subject.subjectname.toUpperCase()}/unit`}>
                      {subject.subjectname}
                      <div>
                        <pre className={header.hidden_keywords}>{subject.description}</pre>
                        <pre className={header.insights}>/{subject.course} </pre>
                        <pre className={header.hidden_keywords}>{subject.keywords}</pre>
                      </div>
                    </a>
                  </li>
                ))
              }
              <div className={header.results}>Units :</div>
              {
                unitSearchData.map((unit) => (
                  <li key={unit._id} onClick={() => putToRecents(unit.unitname)}>
                    <a href={`/course/${unit.course.toUpperCase()}/subject/${unit.subject.toUpperCase()}/unit/${unit.unitname}/material`}>
                      {unit.unitname}
                      <div>
                        <pre className={header.hidden_keywords}>{unit.description}</pre>
                        <pre className={header.insights}>/{unit.course} </pre>
                        <pre className={header.insights}>/{unit.subject} </pre>
                        <pre className={header.hidden_keywords}>{unit.keywords}</pre>
                      </div>
                    </a>
                  </li>
                ))
              }
              <div className={header.results}>Materials :</div>
              {
                materialSearchData.map((material) => (
                  <li key={material._id} onClick={() => putToRecents(material.materialname)}>
                    <a href={`/course/${material.course.toUpperCase()}/subject/${material.subject.toUpperCase()}/unit/${material.unit}/material/${material._id}`}>
                      {material.materialname}
                      <div>
                        <pre className={header.hidden_keywords}>{material.description}</pre>
                        <pre className={header.insights}>/{material.course} </pre>
                        <pre className={header.insights}>/{material.subject} </pre>
                        <pre className={header.insights}>/{material.unit} </pre>
                        <pre className={header.hidden_keywords}>{material.keywords}</pre>
                      </div>
                    </a>
                  </li>
                ))
              }
              {/* http://localhost:5173/course/BCA/subject/TWS/unit/Unit%20Three/material/6797db3f403af229c5aae083 */}
            </div>
          )
        }
      </div>
    </>
  )
}
