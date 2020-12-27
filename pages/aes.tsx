import {Layout} from "../components/layout";
import React from "react";
import CryptoJS from 'crypto-js';
import Nav from "../components/nav";


interface isState {
    a?: string
    b?: string
    key?: string
    iv?: string
    param1?: string
    param2?: string
    encode?: string

}

export default class Page extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'aes'
        this.siteTitle = 'AES加密/解密'
        this.keyword = 'AES加密,AES解密,AES算法'
        this.description = '在线AES加密、解密工具,AES加密,AES解密,AES算法'
        this.Decrypt = this.Decrypt.bind(this);
        this.Encrypt = this.Encrypt.bind(this);
        this.Clear = this.Clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.computeValue = this.computeValue.bind(this);
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {
            a: "",
            b: "",
            key: "",
            iv: "",
            param1: "CBC",
            param2: "PKCS7",
            encode: "BASE64",
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
                    iv: state.iv || "",
                    param1: state.param1 || "CBC",
                    param2: state.param2 || "Pkcs7",
                    encode: state.encode || "BASE64",
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

    Decrypt() {
        let state = this.state;
        if (state.b) {
            try {
                const obj = this.computeValue()
                let b = state.b;
                if (state.encode === 'HEX') {
                    b = CryptoJS.enc.Hex.parse(state.b)
                    b = CryptoJS.enc.Base64.stringify(b);
                }
                let decrypted = CryptoJS.AES.decrypt(b, obj.key, {
                    iv: obj.iv,
                    mode: obj.mode,
                    padding: obj.padding
                });
                let a = decrypted.toString(CryptoJS.enc.Utf8);
                this.setState({a: a})
                localStorage.setItem(this.storageKey, JSON.stringify({
                    ...state,
                    a: a,
                }))
            } catch (e) {
                alert(e)
            }
        }
        return
    }

    Encrypt() {
        let state = this.state;
        if (state.a) {
            const obj = this.computeValue()
            try {
                let encrypted = CryptoJS.AES.encrypt(obj.a, obj.key, {
                    iv: obj.iv,
                    mode: obj.mode,
                    padding: obj.padding
                });
                let cipherText = encrypted.ciphertext.toString()
                if (state.encode === 'BASE64') {
                    cipherText = encrypted.toString()
                }
                this.setState({b: cipherText})
                localStorage.setItem(this.storageKey, JSON.stringify({
                    ...state,
                    b: cipherText
                }))
            } catch (e) {
                alert(e)
            }
        }
    }

    Clear() {
        this.setState(this.getInitialState());
        localStorage.setItem(this.storageKey, JSON.stringify(this.getInitialState()))
    }

    computeValue() {
        const state = this.state;
        let mode = state.param1
        switch (mode) {
            case 'CBC':
                mode = CryptoJS.mode.CBC;
                break;
            case 'CFB':
                mode = CryptoJS.mode.CFB;
                break;
            case 'CTR':
                mode = CryptoJS.mode.CTR;
                break;
            case 'OFB':
                mode = CryptoJS.mode.OFB;
                break;
            case 'ECB':
                mode = CryptoJS.mode.ECB;
                break;
            default:
                mode = CryptoJS.mode.CBC;
                break;
        }
        let padding = state.param2
        switch (padding) {
            case 'Pkcs7':
                padding = CryptoJS.pad.Pkcs7;
                break;
            case 'Iso97971':
                padding = CryptoJS.pad.Iso97971;
                break;
            case 'AnsiX923':
                padding = CryptoJS.pad.AnsiX923;
                break;
            case 'Iso10126':
                padding = CryptoJS.pad.Iso10126;
                break;
            case 'ZeroPadding':
                padding = CryptoJS.pad.ZeroPadding;
                break;
            case 'NoPadding':
                padding = CryptoJS.pad.NoPadding;
                break;
            default:
                padding = CryptoJS.pad.Pkcs7;
                break;
        }
        let a = CryptoJS.enc.Utf8.parse(state.a);
        const key = CryptoJS.enc.Utf8.parse(state.key);  //十六位十六进制数作为密钥
        const iv = CryptoJS.enc.Utf8.parse(state.iv);   //十六位十六进制数作为密钥偏移量
        return {
            a: a,
            key: key,
            iv: iv,
            mode: mode,
            padding: padding,
        }
    }

    render() {
        return (
            <Layout siteTitle={this.siteTitle} right={<Nav/>}>
                <div>
                    <div className="mt2">
                        <textarea className="textarea" cols={30} rows={10} name="a" value={this.state.a}
                                  onChange={this.handleChange}/>
                    </div>
                    <div className="group mt2 fullwidth">
                        <span className="static">模式</span>
                        <select className="select" name="param1" onChange={this.handleChange}
                                value={this.state.param1}>
                            <option value="CBC">CBC</option>
                            <option value="ECB">ECB</option>
                            <option value="CFB">CFB</option>
                            <option value="CTR">CTR</option>
                            <option value="OFB">OFB</option>
                        </select>
                        <span className="static">填充</span>
                        <select className="select" name="param2" onChange={this.handleChange}
                                value={this.state.param2}>
                            <option value="Pkcs7">Pkcs7</option>
                            <option value="Iso97971">Iso97971</option>
                            <option value="AnsiX923">AnsiX923</option>
                            <option value="Iso10126">Iso10126</option>
                            <option value="ZeroPadding">ZeroPadding</option>
                            <option value="NoPadding">NoPadding</option>
                        </select>
                        <input className="input" type="text" name="iv" placeholder="偏移量"
                               value={this.state.iv}
                               onChange={this.handleChange}/>
                        <span className="static">编码</span>
                        <select className="select" name="encode" onChange={this.handleChange}
                                value={this.state.encode}>
                            <option value="BASE64">BASE64</option>
                            <option value="HEX">HEX</option>
                        </select>
                    </div>
                    <div className="group mt1 fullwidth">
                        <span className="static">密钥</span>
                        <input className="input" type="text" name="key" value={this.state.key}
                               onChange={this.handleChange}/>
                        <button className="button success" onClick={this.Encrypt}><i className="fa fa-arrow-down fa-icon"/>加密
                        </button>
                        <button className="button info" onClick={this.Decrypt}><i className="fa fa-arrow-up fa-icon"/>解密
                        </button>
                        <button className="button" onClick={this.Clear}>清空</button>
                    </div>
                    <div className="mt2">
                        <textarea className="textarea" cols={30} rows={10} name="b" value={this.state.b}
                                  onChange={this.handleChange}/>
                    </div>
                </div>
            </Layout>
        )

    }
}

