import {ResponsiveContainer, ComposedChart,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Graph.css'
import { useEffect, useState } from 'react';
// Format date for display
const formatDate = ({ x, y, payload }) => {
    // console.log(`timestamp: ${timestamp}`)
    const date = new Date(payload.value).toLocaleDateString('en-US', {
        // year: 'numeric', 
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const [datePart, timePart] = date.split(', ');
  
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
            <tspan x={0} dy="0">{datePart}</tspan>
            <tspan x={0} dy="15">{timePart}</tspan>
        </text>
        </g>
    )
    // const parts = fixedDate.split(', ');
    // return parts;
    // return fixedDate;
};

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//         return (
//             <div style={{
//                 backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 border: '1px solid #3DFFC5'
//             }}>
//                 <p style={{ color: '#3DFFC5', margin: '0 0 5px 0', fontWeight: 'bold' }}>
//                     {formatDate(payload[0].payload.timestamp)}
//                 </p>
//                 <p style={{ color: '#3DFFC5', margin: 1 }}>
//                     Close: ${payload[0].value.toFixed(2)}

//                 </p>

//                 <p style={{ color: '#3DFFC5', margin: 1 }}>
//                     High: ${payload[0].payload.high.toFixed(2)}

//                 </p>

//                 <p style={{ color: '#3DFFC5', margin: 1 }}>
//                     Low: ${payload[0].payload.low.toFixed(2)}

//                 </p>
//             </div>
//         );
//     }
//     return null;
// };

const Graph = (props) => {
    const fieldsArr = ['local_time', 'views', 'reach', 'likes', 'comments', 'saves', 'shares'];
    const theme = props.theme;
    
    const [textColor, setTextColor] = useState('#666666')
    // const data = props.data 

    useEffect(() => {
        const handleThemeColors = () => {
            console.log("theme: ",theme)
            if(theme === "dark") {
                setTextColor('#f3f3f3')
            } else {
                setTextColor('#666666')
            }
        };
        handleThemeColors()

    },[theme])

    // Safety check and create reversed copy instead of mutating
    const data = props.data && Array.isArray(props.data) 
        ? [...props.data].reverse() 
        : [];
    
    if (data.length === 0) {
        return <div className="graph">No data available</div>;
    }

    console.log("from graph, data: ", data)

    return (
        <div className="graph container-style">

            <ResponsiveContainer width="100%" height="100%" minWidth="0" minHeight={undefined} >
                <ComposedChart data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis
                        dataKey="local_time"
                        tickFormatter={<formatDate />}
                        // angle={-45}
                        // textAnchor="end"
                        tick={{ fill: textColor }}
                        // stroke='none'
                        label=""
                        // height={40}
                        tickCount={5}
                        tickLine={true}
                        // tick={true}
                        // interval={15}
                        // hide={type === 'small' ? true : false}
                    />
                    <YAxis
                        datakey='views'
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tick={{ fill: textColor }}
                        stroke='none'
                        allowDecimals={false}
                        tickFormatter={(value) => {
                            return value % 1 === 0 ? value : value.toFixed(1);
                        }}
                        // hide={type === 'small' ? true : false}
                    />
                    {/* {type === 'small' ? '' : <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#3DFFC5', strokeWidth: 1, strokeDasharray: '5 5' }}

                    />} */}

                    <Line
                        type="monotone"
                        dataKey="views"
                        stroke={textColor}
                        strokeWidth={1}
                        strokeOpacity={0.4}
                        dot={false}
                        name="High"
                        // hide={type === 'small' ? true : false}
                    />

                    {/* Low line - lighter */}
                    {/* <Line
                        type="monotone"
                        dataKey="likes"
                        stroke="#3DFFC5"
                        strokeWidth={1}
                        strokeOpacity={0.4}
                        dot={false}
                        name="Low"
                        // hide={type === 'small' ? true : false}
                    /> */}

                    {/* Close price line - solid and prominent */}
                    {/* <Line
                        type="monotone"
                        dataKey='shares'
                        stroke='#3DFFC5'
                        strokeWidth={2}
                        dot={false}
                        // activeDot={type === 'small' ? false : { r: 6, fill: '#3DFFC5', stroke: '#fff', strokeWidth: 2 }}
                        name="Shares"
                    /> */}
                </ComposedChart>
            </ResponsiveContainer>

        </div>
    );
}

export default Graph;