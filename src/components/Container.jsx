import { useState } from "react";
import { Row } from "./Row";

export const Container = () => {

    let nbTry = Array(6).fill('')

    let word = ['b', 'o', 'n', 'j', 'o', 'u', 'r'];

    const [letter, setLetter] = useState([Array(word.length).fill('.'), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill('')]);
    // let letter = [Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill(''), Array(word.length).fill('')]

    let arr = Array(word.length).fill('.')
    let arr2
    let i = 0;
    let j = 0;
    const [state, setstate] = useState(0);

    const write = (e) => {
        // if (letter[i].includes('.')) {
        // setLetter([letter[i].splice(state, 1, e.key), ...letter.slice(i + 1, word.length)])
        setstate(state + 1)


        if (arr2 === undefined) {
            arr.splice(state, 1, e.key)
        }
        console.log(state);
        console.log(arr);
        // }
    }

    window.onkeydown = write;

    return (
        <div className="container">
            {nbTry.map((value, key) => (
                <Row key={key} data={letter} rowKey={key} arr={word} />
            ))}
        </div>
    );
};