export const Letter = ({ letter, className }) => {
    return (
        letter ? <p className={`letter${className ? ' ' + className : ''}`} >{letter}</p> : ''
    );
};