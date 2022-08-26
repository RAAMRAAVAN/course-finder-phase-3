import React, {useEffect,useState} from "react";
import axios from "axios";
import Filter from "./components/filter";
function Routers()
{
    const [courses,setCourses]=useState([]);
    const [parentData,setParentData]=useState([]);
    const [parentLabels,setParentLabels]=useState([]);
    const [parentstatus,setparentStatus]=useState(false);
    const [providerData,setproviderData]=useState([]);
    const [providerLabels,setproviderLabels]=useState([]);
    const [providerstatus,setproviderStatus]=useState(false);
    const Courses = async () => {
        const { data } = await axios("https://nut-case.s3.amazonaws.com/coursessc.json");
        setCourses(data);
      };
    const parentGraph=async()=>{
      let searchValue=["Parent Subject"];
      let uniqueCourses=[];
      let uniqueLengths=[];
      let i=0;
      let numberOfCourses=0;
      await axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
        .then(response=>{
            const sortedCourses=response.data.sort((next,prev)=>{
                if(next[searchValue]>prev[searchValue])
                    return 1;
                else
                    return -1;    
                });
                numberOfCourses=sortedCourses.length;
                while(i<numberOfCourses)
            {
                let search=sortedCourses[i][searchValue];
    
            /********************** creating array of each unique restaurant **********************/
                let searchData=sortedCourses.filter(function(value)
                    {
                        return(value[searchValue]===search);
                    });
            /********************** calculating sum or ratings for each unique restaurant **********************/
            uniqueCourses.push(search);
            uniqueLengths.push(searchData.length);
                i=i+searchData.length;
            }
            setParentData(uniqueLengths);
            setParentLabels(uniqueCourses);
            setparentStatus(true);
          })
            .catch(error=>{
                console.log(error.message)
          })
    }

    const providerGraph=async()=>{
      let searchValue=["Provider"];
      let uniqueCourses=[];
      let uniqueLengths=[];
      let i=0;
      let numberOfCourses=0;
      await axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
        .then(response=>{
            const sortedCourses=response.data.sort((next,prev)=>{
                if(next[searchValue]>prev[searchValue])
                    return 1;
                else
                    return -1;    
                });
                numberOfCourses=sortedCourses.length;
                while(i<numberOfCourses)
            {
                let search=sortedCourses[i][searchValue];
    
            /********************** creating array of each unique restaurant **********************/
                let searchData=sortedCourses.filter(function(value)
                    {
                        return(value[searchValue]===search);
                    });
            /********************** calculating sum or ratings for each unique restaurant **********************/
            uniqueCourses.push(search);
            uniqueLengths.push(searchData.length);
                i=i+searchData.length;
            }
            setproviderData(uniqueLengths);
            setproviderLabels(uniqueCourses);
            setproviderStatus(true);
          })
          .catch(error=>{
              console.log(error.message)
          })
    }
        useEffect(() => {
        Courses();
        parentGraph();
        providerGraph();
      }, []);

    return (
        <div className="App">          
            <Filter  courses={courses} parentData={parentData} parentLabels={parentLabels} parentstatus={parentstatus} providerData={providerData} providerLabels={providerLabels} providerstatus={providerstatus}/>                     
        </div>
        );
     
    
}
export default Routers;