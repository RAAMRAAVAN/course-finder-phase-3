import React, {useState,useEffect} from "react";
import Courses from "./Courses";

function Pagignation(props)
{
    const [currentPageNo,setPageNo]=useState(1);
    let [S,setS]=useState(0);
    let [E,setE]=useState(5);
    let [pageNo,setpageNo]=useState(1);

    const courses=props.courses;
    const numberofcourses=courses.length;
    let numberOfPages=Math.ceil(numberofcourses/6)

    let allPagesArr=[];   
    // reset

    let reset=()=>{
      setS(0);
      setE(5);
      setpageNo(1);
      numberOfPages=Math.ceil(numberofcourses/6)
      for(let i=0;i<numberOfPages;i++)
          allPagesArr[i]=i+1;
      if(numberOfPages<10)
          E=numberOfPages;  

      subArr=allPagesArr.slice(S,E);
      setpageNo(0);
  }
 
  useEffect(() => {
      reset();
    }, [numberofcourses]);
    // 

    for(let i=0;i<numberOfPages;i++)
        allPagesArr[i]=i+1;

    if(numberOfPages<10)
        E=numberOfPages;  

    let subArr=allPagesArr.slice(S,E);

  let PageNo=(value)=>
  {
    
    setPageNo(value);
    setpageNo(value*6-6);
  }

  let CounterE=()=>
  {
    if(currentPageNo<numberOfPages)
        {
            setPageNo(currentPageNo+1);
            setpageNo(pageNo+6);
        }
        if(E<numberOfPages)
            {
                setS(S+1);
                setE(E+1);
                subArr=allPagesArr.slice(S,E);
            }
    }     
    let CounterS=()=>
    {
        if(currentPageNo>1)
        {
            setPageNo(currentPageNo-1);
            setpageNo(pageNo-6);
        }
        if(S>0)
        {
            setS(S-1);
            setE(E-1);
            subArr=allPagesArr.slice(S,E);
        }
        
    }
    

    if(courses.length>0)
    {
        return(
            <>
                <Courses pageNo={pageNo} StoredCourses={props.courses}/>
                <div className="App">
                <div className="pageContainer mb-5">
                {currentPageNo>1?<button className="pageNo" onClick={()=>{CounterS()}}><i className="fa fa-caret-left" aria-hidden="true"></i></button>:<button className=" disabled" disabled ><i className="fa fa-caret-left" aria-hidden="true"></i></button>}
                
                {subArr.map(function(number,index){
                        // {return((currentPageNo==(index+1))?<button key={index} className="disabled" onClick={()=>PageNo(number)}>{number}</button>:<button key={index} className="pageNo" onClick={()=>PageNo(number)}>{number}</button>)}
                    return(
                    <button key={index} className="pageNo" onClick={()=>PageNo(number)}>{number}</button>
                    );
                })}
                {currentPageNo<numberOfPages?<button className="pageNo" onClick={()=>{CounterE()}}><i className="fa fa-caret-right" aria-hidden="true"></i></button>:<button className="disabled" onClick={()=>{CounterE()}}><i className="fa fa-caret-right" aria-hidden="true"></i></button>}
                
                </div>
                </div>
            </>
        );
    }
        

}
export default Pagignation;