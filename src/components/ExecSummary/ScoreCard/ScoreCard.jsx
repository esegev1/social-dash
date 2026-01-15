import { useState } from "react";


const ScoreCard = (props) => {

    // const [title, setTitle] = useState(props.title)
    // const [metric, setMetric] = useState(props.mainScore[0][props.title])
    const fieldname = props.title.toLowerCase().replace(/ /g, "_");


    console.log("props: ", props.mainScore[0][props.title])
    return (
        <div className="score-card">
            <h4> {props.title}</h4>
            <p> <strong>{props.mainScore[0][fieldname].toLocaleString('en-US')}</strong></p>
        </div>
    )
};

export default ScoreCard;