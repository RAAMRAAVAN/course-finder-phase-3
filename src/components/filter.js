import React, {useState} from "react";
import Pagignation from "./pagignation";
import Header from "./Header";
import Graph from "./Graph";
function Filters(props)
{   
    // for mobile view
    const [hideMenu,setHideMenu]=useState("hide-menu");
    const [hideStatus,setHideStatus]=useState(true);
    // let btn="btn";
    let menuCss=()=>{
        if(hideStatus===true)
            {
                setHideMenu("");
                setHideStatus(false);
            }
        else
            {
                setHideMenu("hide-menu")
                setHideStatus(true);
            }   
    } 
    let collapse=()=>{
        setHideMenu("hide-menu")
        setHideStatus(true);
    }
    // end

    const courses=props.courses;
    const [filteredValue,setFilteredValue]=useState(courses);
    const [check,checkInput]=useState(false);
    const [course,inputcourse]=useState("");
    const [child,inputchild]=useState("");
    const [Date,setDate]=useState("");
    const [filterStatus,setFilterStatus]=useState(false);
    const [graphMenu,setGraphMenu]=useState(false);
    const [displayProviderStatus,setdisplayProviderStatus]=useState(false);
    const [displayParentStatus,setdisplayParentStatus]=useState(false);
    const montharr=["Jan,","Feb,","Mar,","Apr,","May,","Jun,","Jul,","Aug,","Sep,","Oct,","Nov,","Dec,"];
    
    let filterPara={};
    // Date converter
    let DateToString=()=>
    {
            let date=Date.split("-");
            let year=date[0];

            let FinalMonth=montharr[parseInt(date[1])-1];
            let finalDate;
            switch(date[2])
            {
            case "21":  finalDate=date[2]+"st";
            break;
            case "01": finalDate="1st";
            break;
            case "22": finalDate=date[2]+"nd";
            break;
            case "02": finalDate="2nd";
            break;
            case "23": finalDate=date[2]+"rd";
            break;
            case "03": finalDate="3rd";
            break;
            case "04": finalDate="4th";
            break;
            case "05": finalDate="5th";
            break;
            case "06": finalDate="6th";
            break;
            case "07": finalDate="7th";
            break;
            case "08": finalDate="8th";
            break;
            case "09": finalDate="9th";
            break;
            default:
                finalDate=date[2]+"th";
            }
            let fullFinalDate=finalDate+" "+FinalMonth+" "+year;
            return(fullFinalDate); 
    }

    let inputCourse=(event)=> inputcourse(event.target.value);
    let inputchildSubject=(event)=>inputchild(event.target.value);
    let inputDateValue=(event)=>
    {
        if(event.target.value!=="")
            {setDate(event.target.value);  }
        else
            {setDate(""); }            
    }
    let checkSelfPlaced=(event)=>checkInput(event.target.checked)
    let Filterdata=(event)=>
    {
        setFilterStatus(true);
        collapse() 
            let DateString="";
            if(Date==="")
                {DateString="";   }
            else
                DateString=DateToString();
            filterPara={};      
            filterPara={course:course,childSubject:child,date:DateString,selfPlaced:check};
            if(filterPara!=={})
            Filter();
    } 

    let filteredValueTemp=[];
    
    let Filter=()=>
    {
        filteredValueTemp=courses;
        if(filterPara["selfPlaced"]===true)
        {
            filteredValueTemp=filteredValueTemp.filter((value)=>{return(value["Next Session Date"]==="Self paced")});
        }
        if(filterPara["childSubject"]!==[])
        {
            filteredValueTemp=filteredValueTemp.filter((value)=>{
                let str1=value["Child Subject"].toUpperCase();
                let str2=filterPara["childSubject"].toUpperCase();
                return(str1.includes(str2));
            });
        }
        if(filterPara["course"]!==[])
        {
            filteredValueTemp=filteredValueTemp.filter((value)=>{
                let str1=value["Course Name"].toUpperCase();
                let str2=filterPara["course"].toUpperCase();
                return(str1.includes(str2));
            });
        }
        if(filterPara["date"]!=="")
        {
            filteredValueTemp=filteredValueTemp.filter((value)=>{return(value["Next Session Date"]===filterPara["date"])});
        }
        setFilteredValue(filteredValueTemp);
    }    
    // Graph
    let ProviderTrue=()=>{
            setdisplayProviderStatus(true);
            setdisplayParentStatus(false);
        }

    let ProviderFalse=()=>{
        setdisplayProviderStatus(false);
        }

    let ParentTrue=()=>{
            setdisplayParentStatus(true);
            setdisplayProviderStatus(false);
        }
    let ParentFalse=()=>{
        setdisplayParentStatus(false);
        }
    let hideGraph=()=>{
        setGraphMenu(false)
        ParentTrue()
        setdisplayProviderStatus(false);
        setdisplayParentStatus(false);
    }   
     
      return(
    <>
    {filterStatus?<Header numberOfCourses={filteredValue.length}/>:<Header numberOfCourses={courses.length}/>}
    <div className="menu">        
        <div className=" bg-white col-xl-9 col-lg-11 col-md-11 col-sm-10 col-11 menu-border row px-sm-2 py-sm-2 justify-content-center">
            <button  className="btn border-0 col-11 FilterMenu" onClick={()=>menuCss()}>
                <i className="fa fa-filter icon-color me-2 " aria-hidden="true"></i> Filter Courses
            </button>
            <div className={`${hideMenu} col-lg-3 col-md-3 col-12 d-flex justify-content-center row p-0 m-0 my-sm-2 my-2`}>
                <div className={`${hideMenu} menu-shadow col-11  border-0`}>
                    <div className={`${hideMenu} form-floating my-1 `}>
                        <input type="text" className={`${hideMenu} form-control border-0`}  id="floatingInput" placeholder="name@example.com" onChange={inputCourse}/>
                        <label htmlFor="floatingInput" className={`${hideMenu}`}><i className={`${hideMenu} fa-solid icon-color fa-book-open me-2`}></i>Course</label>
                    </div> 
                </div>
            </div>
            <div className={`${hideMenu} col-lg-3 col-md-4 d-flex justify-content-center row p-0 m-0 my-sm-2 my-2  `}>
                <div className={`${hideMenu} menu-shadow col-11 border-0   `}>
                    <div className={`${hideMenu} form-floating my-1 floating-border`}>
                        <input type="text" className={`${hideMenu} form-control border-0   `} id="floatingInput" placeholder="name@example.com" onChange={inputchildSubject}/>
                        <label htmlFor="floatingInput" className={`${hideMenu} `}><i className={`${hideMenu} fa-solid icon-color fa-chalkboard-user me-2 `}></i>Child Subject</label>
                    </div>
                </div>
            </div>
            <div className={`${hideMenu} col-lg-3 col-md-3 d-flex justify-content-center row p-0 m-0 my-sm-2 my-2`}>
                <div className={`${hideMenu} menu-shadow col-11  border-0 m-0 px-md-3 px-4`}>
                    <div className={`${hideMenu} input-group form-floating my-1`}>
                        <span className={`${hideMenu} input-group-text border-0 p-0 bg-white`}><i className={`${hideMenu} fa-solid icon-color fa-calendar-week `}></i></span>
                        <input type="date" className={`${hideMenu} form-control border-0 p-0 m-0 ps-2 `} id="floatingInput" placeholder="name@example.com" onChange={inputDateValue}/>
                    </div> 
                </div>
            </div>
            <div className={`${hideMenu}  col-lg-3 col-md-2 d-flex justify-content-center row p-0 m-0 `}>
                <div className={`${hideMenu}  col-xl-11 col-lg-10 col-md-12 col-sm-11 col-11 d-flex justify-content-lg-between justify-content-md-center justify-content-sm-start align-content-center p-0 m-0 row`}>
                    <div className={`${hideMenu}   d-flex m-0 p-0 col-xl-8 col-lg-8 my-sm-2 my-2 justify-content-md-evenly align-items-center `}>
                        <input type="checkbox" id="selfplaced" className={`${hideMenu}  m-0 p-0 me-2`}  onChange={checkSelfPlaced}/>
                        <label htmlFor="selfplaced" className={`${hideMenu} `}>Self Placed</label>
                    </div>
                    <div className={`${hideMenu} col-xl-4 col-lg-4 col-md-8 btn btn-sm submit-btn mt-md-1 my-sm-2 `}  onClick={()=>{Filterdata()}}>Submit</div>
                </div>
            </div>
            {hideStatus?<></>: <div className=" col-lg-3 col-md-2 d-flex justify-content-center row Filter-Toggel">
            <button className="col-sm-11 border-0 btn d-flex justify-content-center Filter-Toggel" onClick={()=>{collapse()}}><i class="Filter-Toggel fa-solid fa-caret-up"></i></button>
            </div> }
            
        </div>       
    </div> 
    
    <div className="d-flex flex-column col-12 align-items-center mt-4">
        {graphMenu?<button onClick={()=>{hideGraph()}} className="btn btn-outline-danger">Hide Graph</button>:<button onClick={()=>{setGraphMenu(true)}} className="btn btn-outline-success">Show Graph</button>}
        <div className="mt-3">
            {graphMenu?props.providerstatus?<button onClick={()=>{ProviderTrue()}} className="btn btn-outline-info me-2">Provider Subject Graph True</button>:<button onClick={()=>{ProviderFalse()}} className="btn btn-outline-info me-2">Provider Subject Graph </button>:<></>}
            {graphMenu?props.parentstatus?<button onClick={()=>{ParentTrue()}} className="btn btn-outline-warning">Parent Subject Graph true</button>:<button onClick={()=>{ParentFalse()}} className="btn btn-outline-warning">Parent Subject Graph </button>:<></>}
        </div>
        {displayProviderStatus?props.providerstatus?<Graph parentData={props.providerData} parentLabels={props.providerLabels}/>:<></>:<></>}
        {displayParentStatus?props.parentstatus?<Graph parentData={props.parentData} parentLabels={props.parentLabels}/>:<></>:<></>}
        
    </div>
    {filterStatus?<Pagignation courses={filteredValue} reserStatus={true}/>:<Pagignation courses={courses} reserStatus={false}/>}
    </>
    )
}
export default Filters;