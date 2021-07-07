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

var gbrt = ["年", "周", "天", "小时", "分", "秒", "毫秒", "微秒", "纳秒"];
var factors = [0.0027397260273973, 0.14285714285714, 1, 24, 1440, 86400, 86400000, 86400000000, 86400000000000];

function translateTimeValue(from: number, target: number, source: number) {
    return fix((factors[target - 1] / factors[from - 1]) * source)
}

function translateTimeAllValue(from: number, source: number) {
    let res = []
    for (let i = 1; i <= factors.length; i++) {
        res.push(fix(translateTimeValue(from, i, source)))
    }
    return res
}

function fix(v) {
    if (!isFinite(v))
        return "";
    if (v == 0)
        return "0";
    let st = "" + v;
    let epos = st.indexOf('E');
    if (epos == -1)
        epos = st.indexOf('e');
    let sdigi = Math.log(Math.abs(v)) / Math.LN10;
    let sdigif = Math.floor(sdigi);
    if (epos == -1) {
        let adjust = Math.pow(10, sdigif - 12);
        let faqs = Math.round(v / adjust);
        let norst = "" + faqs;
        if (sdigif < 12) {
            let adjust2 = Math.pow(10, 12 - sdigif);
            return (faqs / adjust2);
        } else
            return (faqs * adjust);
    } else {
        let zo = v * Math.pow(10, 12 - sdigif);
        let szo = String(Math.round(zo));
        let inse = -1;
        if (szo.charAt(0) == '-')
            inse = 2;
        else
            inse = 1;
        let rest = szo.substring(inse, szo.length);
        let i = rest.length - 1;
        while (i >= 0 && rest.charAt(i) == '0')
            i--;
        rest = rest.substring(0, i + 1);
        let rou = szo.substring(0, inse);
        if (rest.length > 0)
            rou += "." + rest;
        let sa
        if (sdigif < 0)
            sa = rou + "E";
        else
            sa = rou + "E+";
        let snow = sa + sdigif;
        let vanow = Math.abs(parseFloat(snow));
        let faqsvab = Math.abs(v);
        if (sdigif >= 0) {
            if (vanow > 5 * faqsvab)
                snow = sa + String(sdigif - 1);
            else if (vanow < faqsvab / 5)
                snow = sa + String(sdigif + 1);
        } else if (sdigif >= 0) {
            if (vanow > 5 * faqsvab)
                snow = sa + String(sdigif + 1);
            else if (vanow < faqsvab / 5)
                snow = sa + String(sdigif - 1);
        }
        vanow = parseFloat(snow);
        if (vanow > 1.1 * v || vanow < 0.9 * v)
            return v;
        else
            return snow;
    }
}

function quickTime() {
    const [value, setValue] = useState<string>("")
    const [from, setFrom] = useState<number>(1)
    const [to, setTo] = useState<number>(0)
    const [result, setResult] = useState<Array<number>>()
    const translate = (from, to, value) => {
        if (!value) {
            return
        }
        if (to === 0) {
            return translateTimeAllValue(from, parseInt(value))
        }
        return [translateTimeValue(from, to, parseInt(value))]
    }
    return (<div >
        <div className="flex mt2" style={{ justifyContent: "center" }}>
            <input className="input mr1 min-w-4 max-w-8" type="number" value={value} placeholder="请输入值" onChange={e => {
                setValue(e.target.value)
                setResult(translate(from, to, e.target.value))
            }} />
            <select className="select mr1" name="from" onChange={(e) => {
                setFrom(parseInt(e.target.value))
                setResult(translate(parseInt(e.target.value), to, value))
            }} value={from}>
                <option value="1">年</option>
                <option value="2">周</option>
                <option value="3">天</option>
                <option value="4">时</option>
                <option value="5">分</option>
                <option value="6">秒</option>
                <option value="7">毫秒</option>
                <option value="8">微秒</option>
                <option value="9">纳秒</option>
            </select>
            <button className="button success mr1" >转换</button>
            <select className="select" name="to" onChange={(e) => {
                setTo(parseInt(e.target.value))
                setResult(translate(from, parseInt(e.target.value), value))

            }} value={to}>
                <option value="0">全部</option>
                <option value="1">年</option>
                <option value="2">周</option>
                <option value="3">天</option>
                <option value="4">时</option>
                <option value="5">分</option>
                <option value="6">秒</option>
                <option value="7">毫秒</option>
                <option value="8">微秒</option>
                <option value="9">纳秒</option>
            </select>
        </div>
        {
            to === 0 && result && result.length && <div className="flex-center fullwidth" style={{ flexDirection: "column" }}>
                <div className="flex-around">
                    <div className="under-line">{result[1]} 周(week) </div>
                    <div className="under-line">{result[2]} 天(d) </div>
                </div>
                <div className="flex-around ">
                    <div className="under-line"> {result[3]} 时(h) </div>
                    <div className="under-line"> {result[4]} 分(min)</div>
                </div>

                <div className="flex-around ">
                    <div className="under-line"> {result[5]} 秒(s) </div>
                    <div className="under-line"> {result[6]} 毫秒(ms)</div>
                </div>

                <div className="flex-around ">
                    <div className="under-line"> {result[7]} 微秒(μs) </div>
                    <div className="under-line"> {result[8]} 纳秒(ns)</div>
                </div>
            </div>
        }
        <div className="flex" style={{ justifyContent: "center" }}>
            国际单位：秒(s)
        </div>
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