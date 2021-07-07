import { useState } from "react";
import styles from "./layout.module.css";
export default function Quick() {
    const [segment, setSegment] = useState<string>("time")
    return (<div className="quick">
        <div className="flex mt2" style={{ justifyContent: "center" }}>
            <nav>
                <ul>
                    <li><a className={segment === "time" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("time")
                    }}>时间</a></li>
                    <li><a className={segment === "length" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("length")
                    }}>长度</a></li>
                    <li><a className={segment === "area" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("area")
                    }}>面积</a></li>
                    <li><a className={segment === "volume" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("volume")
                    }}>体积</a></li>
                    <li><a className={segment === "quality" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("quality")
                    }}>质量</a></li>
                    <li><a className={segment === "temperature" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("temperature")
                    }}>温度</a></li>
                    <li><a className={segment === "pressure" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("pressure")
                    }}>压力</a></li>
                    <li><a className={segment === "power" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("power")
                    }}>功率</a></li>
                    <li><a className={segment === "energy" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("energy")
                    }}>功/能/热</a></li>
                    <li><a className={segment === "density" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("density")
                    }}>密度</a></li>
                    <li><a className={segment === "strength" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("strength")
                    }}>力</a></li>
                    <li><a className={segment === "speed" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("speed")
                    }}>速度</a></li>
                    <li><a className={segment === "storage" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("storage")
                    }}>存储</a></li>
                    <li><a className={segment === "angle" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("angle")
                    }}>角度</a></li>
                    <li><a className={segment === "rmb" ? "selected" : ""} onClick={(e) => {
                        e.preventDefault()
                        setSegment("rmb")
                    }}>人民币</a></li>
                </ul>
            </nav>
        </div>
        {
            segment === "time" && quickTime()
        }
        {
            segment === "length" && quickLength()
        }

        <style jsx >
            {`
            .quick{
                margin:50px;
            }
            nav {
                border-bottom: 1px solid #3273dc42;
                font-weight: 300;
                padding: 0 1em;
            }
        
            ul {
                margin: 0;
                padding: 0;
            }
        
            /* clearfix */
            ul::after {
                content: '';
                display: block;
                clear: both;
            }
        
            li {
                display: block;
                float: left;
            }
        
            .selected {
                position: relative;
                display: inline-block;
            }
        
            .selected::after {
                position: absolute;
                content: '';
                width: calc(100% - 1em);
                height: 2px;
                background-color: #3273dc;
                display: block;
                bottom: -1px;
            }
        
            a {
                text-decoration: none;
                padding: 1em 0.5em;
                display: block;
                cursor:pointer;
            }
         `}
        </style>
    </div>)
}

function quickTime() {
    return (<div className="flex mt2" style={{ justifyContent: "center" }}>
        <input className="input mr1 min-w-4 max-w-8" type="number" placeholder="请输入值" />
        <select className="select mr1" name="from" >
        </select>
        <button className="button success mr1" >转换</button>
        <select className="select" name="to" >
        </select>
        国际单位：秒(s)
    </div>)
}

function quickLength() {
    return (<div className="flex mt2" style={{ justifyContent: "center" }}>
        <input className="input mr1 min-w-4 max-w-8" type="number" placeholder="请输入值" />
        <select className="select mr1" name="from" >
        </select>
        <button className="button success mr1" >转换</button>
        <select className="select" name="to" >
        </select>
        国际单位：米(m)
    </div>)
}