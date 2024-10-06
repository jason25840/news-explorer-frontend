import React from "react";
import notFound from "../images/not-found.svg";
import "../styles/NothingFound.css";

const NothingFound = () => {
    return ( 
        <div className="nothing-found__section">
            <div className="nothing-found__content">
                <img src={notFound} alt="Sad Face" className="nothing-found__image" />
            <h2 className="nothing-found__header">Nothing Found</h2>
            <p className="nothing-found__message">"Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."</p>
            </div>
        </div>
     );
}
 
export default NothingFound;