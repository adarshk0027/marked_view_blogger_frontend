import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs } from 'chart.js/auto'
import { Chart } from '../../AdditionalFunction/blog'
import SideBar from '../sidebar'
function BarChart () {
    const [chartData,setChart]=useState({})
     
    useEffect(()=>{
        Chart(setChart)
    },[])
    const dataSetUp=()=>{
        let datas=[]
        Object.keys(chartData).map((key)=>{
          datas.push(chartData[key])
        })
        return datas
    }
  return (
    <SideBar>
      <h4 className='text-warning'> Chart</h4>
      <div style={{width:"40rem",margin:"2rem 3rem"}}>
      <Line
        data={{
          labels: chartData && Object.keys(chartData),
          datasets:[{
            label:"Blog created / day",
            data:chartData && dataSetUp(),
            lineTension: .4,
            borderColor:"gray",
            backgroundColor:"green",
            animation:true,
            borderWidth:2,
            normalized:true,
            pointStyle:'star',
            pointBorderColor:"blue"
          }]
        }}
        options={{
            maintainAspectRatio:true
        }}
        width={400}
        height={200}
        
      />
      </div>
    </SideBar>
  )
}

export default BarChart
