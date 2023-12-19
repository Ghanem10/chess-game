import React from "react";

import "../../assets/scss/errors/error.scss";

export const ErrorComponent = ({ errorMessage }) => {
    return (
        <div className="error-message">{errorMessage}</div>
    );
};