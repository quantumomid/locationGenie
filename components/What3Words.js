import { useState } from "react";
import { What3wordsAutosuggest } from "@what3words/react-components";

const What3Words = () => {
    const [value, setValue] = useState("");
    const onChange = (e) => setValue(e.target.value);
    console.log(process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY);
    return (
        <>
            <label htmlFor="w3w">what3words address (optional):</label>
            <What3wordsAutosuggest api_key={process.env.NEXT_PUBLIC_WHAT3WORDS_API_KEY}>
                <input
                id="w3w"
                type="text"
                value={value}
                onChange={onChange}
                optional="true"
                />
            </What3wordsAutosuggest>
        </>
    );
}

export default What3Words;