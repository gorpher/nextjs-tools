import {Layout} from "../components/layout";
import React, {useState} from "react";
import Nav from "../components/nav";

interface isState {
    a?: string,
    b?: string,
}

export default class Base64 extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'base64'
        this.siteTitle = 'Base64编码/解码'
        this.keyword = 'Base64,Base64编码,Base64解码'
        this.description = '在线Base64编码、解码工具,Base64,Base64编码,Base64解码'
        this.Decrypt = this.Decrypt.bind(this);
        this.Encrypt = this.Encrypt.bind(this);
        this.Clear = this.Clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {
            a: "",
            b: "",
        }
    }


    componentDidMount() {
        if (typeof window !== 'undefined') {
            let state = JSON.parse(window.localStorage.getItem(this.storageKey));
            if (state) {
                this.setState({
                    a: state.a || "",
                    b: state.b || "",
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
            let a = decodeURIComponent(escape(atob(state.b)))
            this.setState({a: a})
            localStorage.setItem(this.storageKey, JSON.stringify({
                ...state,
                a: a,
            }))
        }
        return
    }

    Encrypt() {
        let state = this.state;
        if (state.a) {
            let b = btoa(unescape(encodeURIComponent(state.a)));
            this.setState({b: b})
            localStorage.setItem(this.storageKey, JSON.stringify({
                ...state,
                b: b
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
                    <div className="mt2">
                        <textarea className="textarea" cols={30} rows={10} name="a" value={this.state.a}
                                  onChange={this.handleChange}/>
                    </div>
                    <div className="content-center mt2">
                        <div>
                            <button className="button success" onClick={this.Encrypt}><i className="fa fa-arrow-down fa-icon"/>编码
                            </button>
                            <button className="button info" onClick={this.Decrypt}><i className="fa fa-arrow-up fa-icon"/>解码
                            </button>
                            <button className="button" onClick={this.Clear}>清空</button>
                        </div>
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

