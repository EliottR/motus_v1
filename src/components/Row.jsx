import { Letter } from "./Letter";

export const Row = ({ data, rowKey, arr }) => {

    return (
        <div className="row">
            {arr.map((value, key) => (
                <Letter letter={data[rowKey][key]} key={key} />
            ))}
        </div>
    );
};