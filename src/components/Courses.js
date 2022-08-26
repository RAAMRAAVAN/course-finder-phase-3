import React from "react";

function CourseContainer(props)
{
        const StoredCourses=props.StoredCourses;
        const numberOfCourses=StoredCourses.length;
        let lb2=props.pageNo;
            let arr=[];
             let count=6;
            if(lb2===numberOfCourses-numberOfCourses%6 )
              count=numberOfCourses%6;
            for(let i=0;i<count;i++)
            {
              arr[i]=lb2+i;   
            }

        let Courseitem=[];

        if(numberOfCourses>0 )
        {
            return( 
                <div className="container-xl container-fluid  mt-5">
                    <div className="row">
                        {
                            arr.map((item)=>{
                                Courseitem=StoredCourses[item];
                                return(
                                    <div key={item} className="col-md-4 col-sm-6 row justify-content-center my-4">
                                    <a href={`${Courseitem["Url"]}`} className="link row justify-content-center p-md-0">
                                    <div className="col-11 rounded-3 content-shadow px-2 pt-4 pb-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="BrushScriptMT">{Courseitem["Course Id"]}</span>
                                        <span>
                                            <i className="fa-solid fa-calendar-days"></i>
                                            <span className="BrushScriptMT">{Courseitem["Next Session Date"]}</span>
                                        </span>
                                    </div>
                                    <div className="fontw text-secondary text-center">   provider     </div>
                                    <div className="h5 fw-bold text-center">{Courseitem["Provider"]}</div>
                                    <div className="fontw text-secondary text-center">   course name  </div>
                                    <div className="text-danger fw-bold text-center">{Courseitem["Course Name"]}</div>
                                    <div className="fontw text-secondary text-center">Universities/ Institutions   </div>
                                    <div className="fw-bold text-center">{Courseitem["Universities/Institutions"]}</div>
                                    <div className="d-flex justify-content-between">
                                        <span className="fontw text-secondary">Parent Subject</span>
                                        <span className="fontw text-secondary">Child Subject </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold pcsize">{Courseitem["Parent Subject"]}</span>
                                        <span className="fw-bold pcsize">{Courseitem["Child Subject"]}</span>
                                    </div>
                                    </div>
                                    </a>
                                </div>
                                )
                                })
                        }
                    </div>                    
                </div>      
                );
        }   
}
export default CourseContainer;