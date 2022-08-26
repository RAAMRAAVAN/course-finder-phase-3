import React,{useState} from "react";
import BarChart from "./Graph/BarChart";


function Graph(props) {
  
  const data=props.parentData;
  const labels=props.parentLabels;

  const [userData, setUserData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Users Gained",
        data: data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    });

  return (
    
    <div className="Graph">
      <div style={{ width: 1200}}>
        <BarChart chartData={userData} />
      </div>
      
    </div>
  );
  
}

export default Graph;