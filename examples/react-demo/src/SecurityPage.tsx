import {useMatches} from "react-router";

export const SecurityPage = () => {
    console.log(useMatches())
    return <div>
        <div style={{textAlign: "center"}}>
            <h1>Security Page</h1>
        </div>
    </div>
}