import { Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const TestPage =() => {

    const [counter, setCounter] = useState(0);
    //region let counter = 0

    const [isVisible, setIsVisible] = useState(true);

    const increase = () => {
        console.log(counter)
        setCounter(counter + 1)
    }

    return(
        <div>
            <h3>{counter}</h3>
            <Button onClick={increase}>Zwieksz</Button>
            <h3>{isVisible ? 'Wyswietlam dane' : 'Odmowa dostepu'}</h3>
            <Button onClick={()=>setIsVisible(!isVisible)}>Zmień</Button>
        </div>
    )
}

export default TestPage