function Search({ setLocation, getCoords }) {

    let inputChangeHandler = (e) => {
        setLocation(e.target.value);
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
                onClick={getCoords}
            >
                Submit
            </button>
        </div>
    )
}

export default Search;