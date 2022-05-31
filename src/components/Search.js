import { React, useState } from "react";

function Search() {

    const [inputText, setInputText] = useState("");

    let inputChangeHandler = (e) => {
        setInputText(e.target.value);
    }

    let inputHandler = () => {
        var input = inputText;
        console.log(input);
    }

    return (
        <div id="search">
            <input
                id="main"
                onChange={inputChangeHandler}
                label="Search"
                type="text"
            />
            <button
                onClick={inputHandler}
            >
                Submit
            </button>
        </div>
    )
}

export default Search;