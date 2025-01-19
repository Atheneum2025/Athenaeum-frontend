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
};

type UnitType = {
  _id: string;
  unitname: string;
  description: string;
  course: string;
  subject: string;
};

type MaterialType = {
  _id: string;
  materialname: string;
  description: string;
  course: string;
  subject: string;
  unit: string;
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
            placeholder="search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsVisible(true)}
          // onKeyDown={handleKeyDown}
          />
          <div onClick={handleVisibility} className={header.cancel_btn}>x</div>
        </div>
        {
          isVisible && (
            <div className={header.search_bar_results}>
              Recents :
              {recentSearches.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0, margin: "8px 0", border: "1px solid #ccc", borderRadius: "4px" }}>
                  {recentSearches.map((term, index) => (
                    <li
                      key={index}
                      onClick={() => putToRecents(term)}
                      style={{ padding: "8px", cursor: "pointer", borderBottom: index !== recentSearches.length - 1 ? "1px solid #ccc" : "none" }}
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              )}
              Results :
              Courses :
              {
                courseSearchData.map((course) => (
                  <li key={course._id} onClick={() => putToRecents(course.coursename)}>
                    <a href={`/course/${course.coursename.toUpperCase()}/subject`}>
                      {course.coursename}
                    </a>
                    <pre style={{ display: 'none' }}>{course.description}</pre>
                    <pre style={{ display: 'none' }}>{course.keywords}</pre>
                  </li>

                ))
              }
              Subjects :
              {
                subjectSearchData.map((subject) => (
                  <li key={subject._id} onClick={() => putToRecents(subject.subjectname)}>
                    <a href={`/course/${subject.course.toUpperCase()}/subject/${subject.subjectname.toUpperCase()}/unit`}>
                      {subject.subjectname}
                    </a>
                    <pre style={{ display: 'none' }}>{subject.description}</pre>
                    <pre style={{ display: 'inline', color: 'red' }}>{subject.course}</pre>
                  </li>
                ))
              }
              Units :
              {
                unitSearchData.map((unit) => (
                  <li key={unit._id}>
                    <a href={`/course/${unit.course.toUpperCase()}/subject/${unit.subject.toUpperCase()}/unit/${unit.unitname}/material`}>
                      {unit.unitname}
                    </a>
                    <pre style={{ display: 'none' }}>{unit.description}</pre>
                    <pre style={{ display: 'none' }}>{unit.course}</pre>
                    <pre style={{ display: 'none' }}>{unit.subject}</pre>
                  </li>
                ))
              }
              Materials :
              {
                materialSearchData.map((material) => (
                  <li key={material._id}>
                    <a href={`/course/${material.course.toUpperCase()}/subject/${material.subject.toUpperCase()}/unit/${material.unit}/material/${material.materialname}`}>
                      {material.materialname}
                    </a>
                    <pre style={{ display: 'none' }}>{material.description}</pre>
                    <pre style={{ display: 'inline', color: 'red' }}>{material.course}</pre>/
                    <pre style={{ display: 'none' }}>{material.subject}</pre>
                    <pre style={{ display: 'none' }}>{material.subject}</pre>

                  </li>
                ))
              }

            </div>
          )
        }
      </div>
    </>
  )
}
