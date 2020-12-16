import {Layout} from "../components/layout";
import React from "react";
import CryptoJS from 'crypto-js';
import Nav from "../components/nav";


interface isState {
    a?: string
    b?: string
    key?: string
    encode?: string
}

export default class Hash extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'hash'
        this.siteTitle = 'Hash/摘要算法'
        this.keyword = 'Hash计算,MD5计算,SHA1计算,SHA-256计算,SHA512计算,哈希,摘要算法'
        this.description = '在线Hash计算工具,MD5计算,SHA1计算,SHA-256计算,SHA512计算,哈希,摘要算法'
        this.Encrypt = this.Encrypt.bind(this);
        this.Clear = this.Clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {
            a: "",
            b: "",
            key: "",
            encode: "MD5",
        }
    }


    componentDidMount() {
        if (typeof window !== 'undefined') {
            let state = JSON.parse(window.localStorage.getItem(this.storageKey));
            if (state) {
                this.setState({
                    a: state.a || "",
                    b: state.b || "",
                    key: state.key || "",
                    encode: state.encode || "MD5",
                });
            }
        }
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        localStorage.setItem(this.storageKey, JSON.stringify({
            ...this.state, [name]: value,
        }))
    }

    Encrypt() {
        let state = this.state;
        if (state.a) {
            let hash;
            switch (state.encode) {
                case 'MD5':
                    hash = CryptoJS.MD5(state.a);
                    break;
                case 'SHA1':
                    hash = CryptoJS.SHA1(state.a);
                    break;
                case 'SHA224':
                    hash = CryptoJS.SHA224(state.a);
                    break;
                case 'SHA256':
                    hash = CryptoJS.SHA256(state.a);
                    break;
                case 'SHA384':
                    hash = CryptoJS.SHA384(state.a);
                    break;
                case 'SHA512':
                    hash = CryptoJS.SHA512(state.a);
                    break;
                case 'Hmac-MD5':
                    hash = CryptoJS.HmacMD5(state.a, state.key);
                    break;
                case 'Hmac-SHA1':
                    hash = CryptoJS.HmacSHA1(state.a, state.key);
                    break;
                case 'Hmac-SHA224':
                    hash = CryptoJS.HmacSHA224(state.a, state.key);
                    break;
                case 'Hmac-SHA256':
                    hash = CryptoJS.HmacSHA256(state.a, state.key);
                    break;
                case 'Hmac-SHA384':
                    hash = CryptoJS.HmacSHA384(state.a, state.key);
                    break;
                case 'Hmac-SHA512':
                    hash = CryptoJS.HmacSHA512(state.a, state.key);
                    break;
            }
            this.setState({b: hash.toString()})
            localStorage.setItem(this.storageKey, JSON.stringify({
                ...state,
                b: hash.toString()
            }))
        }
    }

    Clear() {
        this.setState(this.getInitialState());
        localStorage.setItem(this.storageKey, JSON.stringify(this.getInitialState()))
    }


    render() {
        return (
            <Layout siteTitle={this.siteTitle} right={<Nav/>}>
                <div>
                    <div>
                        <textarea className="textarea" cols={30} rows={10} name="a" value={this.state.a} placeholder="字符串"
                                  onChange={this.handleChange}/>
                    </div>
                    <div>
                        <div className="group">
                            <select className="select" name="encode" onChange={this.handleChange}
                                    value={this.state.encode}>
                                <option value="MD5">MD5</option>
                                <option value="SHA1">SHA1</option>
                                <option value="SHA224">SHA224</option>
                                <option value="SHA256">SHA256</option>
                                <option value="SHA384">SHA384</option>
                                <option value="SHA512">SHA512</option>
                                <option value="Hmac-MD5">Hmac-MD5</option>
                                <option value="Hmac-SHA1">Hmac-SHA1</option>
                                <option value="Hmac-SHA224">Hmac-SHA224</option>
                                <option value="Hmac-SHA256">Hmac-SHA256</option>
                                <option value="Hmac-SHA384">Hmac-SHA384</option>
                                <option value="Hmac-SHA512">Hmac-SHA512</option>
                            </select>
                            <input className="input" type="text" name="key" value={this.state.key} placeholder="密钥,非必填"
                               onChange={this.handleChange}/>
                            <button className="button success" onClick={this.Encrypt}><i className="fa fa-arrow-down"/>计算
                            </button>
                            <button className="button" onClick={this.Clear}>清空</button>
                        </div>
                    </div>
                    <div>
                        <input className="input" type="text"  name="b" value={this.state.b}  style={{width:'100%'}}
                               placeholder="Hash值"
                               onChange={this.handleChange}/>
                    </div>
                </div>
            </Layout>
        )

    }
}

