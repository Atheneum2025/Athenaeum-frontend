import axiosInstance from '../../utils/axios';
import { useEffect, useRef, useState } from 'react';
import header from '../Header/Header.module.css';
import { Link } from 'react-router-dom';
import SearchImage from "../../assets/search.png";
import CancelImage from "../../assets/add.png";
import Recent_Clock from "../../assets/recents_clock.png";

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
  owner: string;
};

type ProfessorType = {
  _id: string;
  username: string;
}

export default function SearchBar() {

  const [search, setSearch] = useState<string>("");
  const [courseSearchData, setCourseSearchData] = useState<CourseType[]>([]);
  const [subjectSearchData, setSubjectSearchData] = useState<SubjectType[]>([]);
  const [unitSearchData, setUnitSearchData] = useState<UnitType[]>([]);
  const [materialSearchData, setMaterialSearchData] = useState<MaterialType[]>([]);
  const [professorSearchData, setProfessorSearchData] = useState<ProfessorType[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchIconVisible, setSearchIconVisible] = useState<boolean>(true);
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
    setIsVisible(!isVisible);
  }

  document.addEventListener("mousedown", (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsVisible(false);
      setSearchIconVisible(true)
    }
  })
  useEffect(() => {


    const fetchSearchResults = async () => {

      if (search !== "") {

        try {


          const [courseResponse, subjectResponse, unitResponse, materialResponse, professorResponse] = await Promise.all([
            axiosInstance.get('/course/c', { withCredentials: true }),
            axiosInstance.get('/subject', { withCredentials: true }),
            axiosInstance.get('/unit', { withCredentials: true }),
            axiosInstance.get('/material', { withCredentials: true }),
            axiosInstance.get('/users/professors', { withCredentials: true }),
          ]);

          const courseData = courseResponse.data;
          const subjectData = subjectResponse.data;
          const unitData = unitResponse.data;
          const materialData = materialResponse.data;
          const professorData = professorResponse.data;

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
          setProfessorSearchData(
            professorData.professors.filter((professor: ProfessorType) =>
              JSON.stringify(professor).toLowerCase().includes(search.toLowerCase())
            )
          )

        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      else {
        setCourseSearchData([]);
        setSubjectSearchData([]);
        setUnitSearchData([]);
        setMaterialSearchData([]);
        setProfessorSearchData([]);
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
        <div
          className={header.search_bar}
          onClick={() => setSearchIconVisible(!searchIconVisible)}
        >
          <input
            type="search"
            placeholder="search here..."
            value={search}
            maxLength={100}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsVisible(true)}

          // onKeyDown={handleKeyDown}
          />
          <button onClick={() => { handleVisibility() }} className={header.cancel_btn}>
            {
              searchIconVisible ? (
                <img src={SearchImage} alt="" />
              ) : (
                <img src={CancelImage} alt="" style={{ transform: "rotateZ(45deg)" }} />
              )
            }
          </button>
        </div>
        {
          isVisible && (
            <div className={header.search_bar_results}>
              {
                search == "" && (
                  <>
                    {recentSearches.length > 0 && (
                      <ul className={header.recents} >
                        {recentSearches.map((term, index) => (
                          <li
                            key={index}
                            onClick={() => putToRecents(term)}
                            style={{paddingBlock: "10px", borderBottom: index !== recentSearches.length - 1 ? "1px solid #ccc" : "none" }}
                          >
                            {term}
                            <img  src={Recent_Clock} alt="" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )
              }
              {/* {
                search !== "" && (
                  <div className={header.results}>Results :</div>
                )  
              } */}
              {
                search !== "" && (
                  <>
                    <div className={header.results}>Courses :</div>
                    {
                      courseSearchData.map((course) => (
                        <li key={course._id} onClick={() => putToRecents(course.coursename)}>
                          <Link to={`/course/${course.coursename.toUpperCase()}/subject`} >{course.coursename}</Link>
                          <pre className={header.hidden_keywords}>{course.description}</pre>
                          <pre className={header.hidden_keywords}>{course.keywords}</pre>
                        </li>
                      ))
                    }
                  </>
                )
              }
              {
                search !== "" && (
                  <>
                    <div className={header.results}>Subjects :</div>
                    {
                      subjectSearchData.map((subject) => (
                        <li key={subject._id} onClick={() => putToRecents(subject.subjectname)}>
                          <Link to={`/course/${subject.course.toUpperCase()}/subject/${subject.subjectname.toUpperCase()}/unit`}>
                            {subject.subjectname}
                            <div>
                              <pre className={header.hidden_keywords}>{subject.description}</pre>
                              <pre className={header.insights}>/{subject.course} </pre>
                              <pre className={header.hidden_keywords}>{subject.keywords}</pre>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </>
                )
              }
              {
                search !== "" && (
                  <>
                    <div className={header.results}>Units :</div>
                    {
                      unitSearchData.map((unit) => (
                        <li key={unit._id} onClick={() => putToRecents(unit.unitname)}>
                          <Link to={`/course/${unit.course.toUpperCase()}/subject/${unit.subject.toUpperCase()}/unit/${unit.unitname}/material`}>
                            {unit.unitname}
                            <div>
                              <pre className={header.hidden_keywords}>{unit.description}</pre>
                              <pre className={header.insights}>/{unit.course} </pre>
                              <pre className={header.insights}>/{unit.subject} </pre>
                              <pre className={header.hidden_keywords}>{unit.keywords}</pre>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </>
                )
              }
              {
                search !== "" && (
                  <>
                    <div className={header.results}>Materials :</div>
                    {
                      materialSearchData.map((material) => (
                        <li key={material._id} onClick={() => putToRecents(material.materialname)}>
                          <Link to={`/course/${material.course.toUpperCase()}/subject/${material.subject.toUpperCase()}/unit/${material.unit}/material/${material._id}`}>
                            {material.materialname}
                            <div>
                              <pre className={header.hidden_keywords}>{material.description}</pre>
                              <pre className={header.insights}>/{material.course} </pre>
                              <pre className={header.insights}>/{material.subject} </pre>
                              <pre className={header.insights}>/{material.unit} </pre>
                              <pre className={header.hidden_keywords}>{material.keywords}</pre>
                              <pre className={header.hidden_keywords}>{material.owner}</pre>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </>
                )
              }
              {
                (search !== "" || professorSearchData.length !== 0) && (
                  <>
                    <div className={header.results}>Professors :</div>
                    {
                      professorSearchData.map((professor) => (
                        <li key={professor._id} >
                          <Link to={`user/${professor._id}/`}>
                            {professor.username}

                          </Link>
                        </li>
                      ))
                    }
                  </>
                )
              }
            </div>
          )
        }
      </div>
    </>
  )
}
