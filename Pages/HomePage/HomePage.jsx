import React from "react";
import './HomePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from "react-router-dom";

const Homepage = () => {

    const historydet = useHistory();
    return (
        <div className="homepage">
            <h1 className="animate__animated animate__pulse animate__infinite">
                <FontAwesomeIcon icon={faHeadphonesSimple}> </FontAwesomeIcon>
                Welcome to AUX
            </h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="button" onClick={() => historydet.push("/login")}>
                Start Listening
                <FontAwesomeIcon icon={faCircleArrowRight}> </FontAwesomeIcon>
            </div>
        </div>
    )

}
export default Homepage;