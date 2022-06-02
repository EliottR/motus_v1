// import axios from "axios";
import { useState } from "react";
import { Row } from "./Row";

export const Container = () => {

    let nbTry = Array(6).fill()

    let word1 = 'egerie';
    let word = word1.split('')

    let arrays = [];
    for (var i = 0; i < nbTry.length; i++) {
        if (i === 0) {
            arrays[i] = Array(word.length).fill('.').fill(word[0], 0, 1)
        }
        else {
            arrays[i] = Array(word.length);
        }
    }

    let arrays1 = [];
    for (let i = 0; i < nbTry.length; i++) {
        arrays1[i] = Array(word.length).fill('');
    }

    const [letter, setLetter] = useState(arrays);
    const [classLetter, setClassLetter] = useState(arrays1);

    const [rowindex, setRowIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(1);
    const regex = /^[A-Za-z]+$/;
    const [prevAnswer, setPrevAnswer] = useState(Array(word.length).fill('.').fill(word[0], 0, 1));

    let count = {}
    let countProposal = {}

    for (let i = 0; i < word.length; i++) {
        count[word[i]] = [word[i], word1.split(word[i]).length - 1]
    }

    for (let i = 1; i < word.length; i++) {
        countProposal[letter[rowindex][i]] = [letter[rowindex][i], letter[rowindex].join('').split(letter[rowindex][i]).length - 1]
    }

    const write = async (e) => {
        // if the current line is not full
        if (letterIndex < word.length) {
            // check if letter is between A & Z 
            if (e.key.match(regex) && e.key.length === 1) {

                if (letterIndex === 1) {
                    setLetter(letter, letter[rowindex] = Array(word.length).fill('.').fill(word[0], 0, 1))
                }

                setLetter(letter, letter[rowindex].splice(letterIndex, 1, e.key))
                setLetterIndex(letterIndex + 1)
            }
        }

        // if tap Backspace
        if (e.key === 'Backspace') {
            // always let the first letter
            if (letterIndex > 1) {
                // rewrite prevAnswer 
                if (letterIndex === 2) {
                    setLetter(letter, letter[rowindex] = prevAnswer)
                }
                else {
                    setLetter(letter, letter[rowindex].splice(letterIndex - 1, 1, '.'))
                }
                setLetterIndex(letterIndex - 1)
            }
        }


        if (e.key === 'Enter') {
            // if nothing is written
            if (letter[rowindex][1] === '.') {
                console.log('ecrivez');
            }
            // if the word is too short than the real word
            else if (letter[rowindex].includes('.')) {
                console.log('trop court');
            }
            // if the word is fully written
            else if (!letter[rowindex].includes('.')) {
                console.log('ok');

                // check if word exists
                try {
                    await fetch('https://frenchwordsapi.herokuapp.com/api/WordDefinition?idOrName=' + letter[rowindex].join(''))
                        .then(res => {
                            // if word exists
                            if (res.status === 200) {
                                letter[rowindex].map((proposal, index) => {
                                    // letter is well placed in the word
                                    if (proposal === word[index]) {
                                        setPrevAnswer(prevAnswer, prevAnswer.splice(index, 1, letter[rowindex][index]))
                                        setClassLetter(classLetter, classLetter[rowindex].splice(index, 1, 'found'))
                                    }
                                    //letter is included in the world but not well placed
                                    else if (word.includes(proposal)) {
                                        // all letters have almost's class
                                        setClassLetter(classLetter, classLetter[rowindex].splice(index, 1, 'almost'))

                                        // delete almost's class for letters that are not useful
                                        if (countProposal[proposal][1] > count[proposal][1]) {
                                            let otherArr = [...letter[rowindex]]
                                            let diff = countProposal[proposal][1] - count[proposal][1]

                                            for (let i = 0; i < diff; i++) {
                                                setClassLetter(classLetter, classLetter[rowindex].splice(otherArr.lastIndexOf(proposal), 1, ''))
                                                otherArr.splice(otherArr.lastIndexOf(proposal), 1)
                                            }
                                        }
                                    }
                                    return classLetter
                                })

                                // if line is full and rowIndex is not at his maximum
                                if (rowindex < 5) {
                                    setRowIndex(rowindex + 1)
                                    setLetter(letter, letter[rowindex + 1] = prevAnswer.slice())
                                    setLetterIndex(1)
                                }

                                // if word is found
                                if (prevAnswer.join('') === word1) {
                                    alert(`vous avez trouvé le mot : ${prevAnswer.join('').toUpperCase()}`)
                                }
                            }
                            else if (res.status !== 200) {
                                let falseWord = letter[rowindex].join('')
                                alert(`Le mot ${falseWord.toUpperCase()} n'existe pas`);
                                // throw new Error(res.status);
                            }
                        })
                        .catch(err => console.log(err))
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
    }

    window.onkeydown = write;

    return (
        <div className="container">
            {nbTry.map((value, key) => (
                <Row key={key} data={letter} rowKey={key} word={word} className={classLetter} />
            ))}
        </div>
    );
};