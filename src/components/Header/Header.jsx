import { useState } from "react";
import { Rules } from "./Rules";

export const Header = () => {
    const [rules, setRules] = useState(false);
    const [stats, setStats] = useState(false);
    const [volume, setVolume] = useState(false);
    const [params, setParams] = useState(false);

    return (
        <div className="header">
            <div onClick={() => setRules(state => !state)} className="header__rules" >❓</div>
            <Rules isVisible={rules} />
            <div onClick={() => setStats(state => !state)} className="header__stats">📊</div>
            <h1 className="header__name">motsu</h1>
            <div onClick={() => setVolume(state => !state)} className="header__volume">🔊</div>
            <div onClick={() => setParams(state => !state)} className="header__parameters">🔧</div>
        </div>
    );
};