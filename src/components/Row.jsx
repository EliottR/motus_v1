import SmoothList from "react-smooth-list";
import { Letter } from "./Letter";

export const Row = ({ data, rowKey, word, className }) => {

    return (
        <article className="row">
            {word.map((value, key) => (
                <section className="border" key={key}>
                    <Letter letter={data[rowKey][key]} key={key} className={className[rowKey][key]} />
                </section>
            ))}
        </article>

    );
};