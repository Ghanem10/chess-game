import React from "react";

export default function Image(props) {
    return (
        <img src={props.index} onClick={props.move}></img>
    );
}