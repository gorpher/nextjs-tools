import {Layout} from "../components/layout";
import React from "react";
import CryptoJS from 'crypto-js';
import Nav from "../components/nav";
import {log} from "util";


interface isState {
    a?: string
    b?: string
    opt?: string
}

export default class Page extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'Unicode'
        this.siteTitle = 'Unicode转中文、中文Unicode编码、ASCII转Unicode、Unicode转ASCII'
        this.keyword = 'Unicode转中文,中文转Unicode,ASCII转Unicode,Unicode转ASCII'
        this.description = '在线Unicode编码转换工具,Unicode转中文,中文转Unicode,ASCII转Unicode,Unicode转ASCII'
        this.Clear = this.Clear.bind(this);
        this.u2c = this.u2c.bind(this);
        this.c2u = this.c2u.bind(this);
        this.u2a = this.u2a.bind(this);
        this.a2u = this.a2u.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {
            a: "",
            b: "",
            opt: "",
        }
    }


    componentDidMount() {
        if (typeof window !== 'undefined') {
            let state = JSON.parse(window.localStorage.getItem(this.storageKey));
            if (state) {
                this.setState({
                    a: state.a || "",
                    b: state.b || "",
                    opt: state.opt || "",
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

    c2u() {
        let input = this.state.a;
        console.log(input)
        let res = [];
        for (let i = 0; i < input.length; i++) {
            res[i] = ("00" + input.charCodeAt(i).toString(16)).slice(-4);
        }
        console.log(res)
        this.setState({
            b: "\\u" + res.join("\\u"),
            opt: 'c2u',
        })
    }

    u2c() {
        let input = this.state.a;
        console.log(input)
        this.setState({
            b: unescape(input.replace(/\\u/gi, '%u')),
            opt: 'u2c',
        })
    }

    u2a() {
        let input = this.state.a;
        let result = '';
        for (let i = 0; i < input.length; i++) {
            result += '&#' + input.charCodeAt(i) + ';';
        }
        this.setState({
            b: result,
            opt: 'u2a',
        })
    }

    a2u() {
        let input = this.state.a;
        let code = input.match(/&#(\d+);/g);
        let result = '';
        if (code === null) {
            this.setState({
                b: '',
                opt: 'a2u',
            })
            return
        }
        for (let i = 0; i < code.length; i++) {
            result += String.fromCharCode(Number(code[i].replace(/[&#;]/g, '')));
        }
        this.setState({
            b: result,
            opt: 'a2u',
        })
    }

    Clear() {
        this.setState(this.getInitialState());
        localStorage.setItem(this.storageKey, JSON.stringify(this.getInitialState()))
    }


    render() {
        return (
            <Layout  siteTitle={this.siteTitle} keyword={this.keyword} description={this.description}  right={<Nav/>}>
                <div>
                    <div className="mt2">
                        <textarea className="textarea" cols={30} rows={10} name="a" value={this.state.a}
                                  onChange={this.handleChange}/>
                    </div>
                    <div className="group mt1 fullwidth">
                        <button className={this.state.opt === 'c2u' ? 'button primary' : 'button'} onClick={this.c2u}><i
                            className="fa fa-arrow-down"/>中文Unicode编码
                        </button>
                        <button className={this.state.opt === 'u2c' ? 'button primary' : 'button'} onClick={this.u2c}><i
                            className="fa fa-arrow-down"/>Unicode转中文
                        </button>
                        <button className={this.state.opt === 'a2u' ? 'button primary' : 'button'} onClick={this.a2u}><i
                            className="fa fa-arrow-down"/>ASCII转Unicode
                        </button>
                        <button className={this.state.opt === 'u2a' ? 'button primary' : 'button'} onClick={this.u2a}><i
                            className="fa fa-arrow-down"/>Unicode转ASCII
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

