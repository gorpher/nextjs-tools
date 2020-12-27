import {Layout} from "../components/layout";
import React, {useState} from "react";
import Nav from "../components/nav";

interface isState {
}

export default class JsonReact extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'rsa'
        this.siteTitle = 'rsa加解密'
        this.keyword = 'rsa加解密'
        this.description = 'rsa加解密'
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState()
    }


    getInitialState() {
        return {}
    }


    componentDidMount() {
        if (typeof window !== 'undefined') {
            let state = JSON.parse(window.localStorage.getItem(this.storageKey));
            if (state) {
                this.setState({});
            }
            // @ts-ignore
            if (window.Init) {
                // @ts-ignore
                window.Init()
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


    render() {
        return (
            <Layout siteTitle={this.siteTitle} right={<Nav/>} link={
                <link href="https://cdn.bootcss.com/jsoneditor/6.1.0/jsoneditor.min.css" rel="stylesheet"
                      type="text/css"/>
            }
                    script={
                        <>
                            <script src="/js/jsencrypt.min.js"/>
                            <script src="/js/rsa.js"/>
                        </>
                    }
            >
                <div>
                    <div className="flex mt2">
                        <div style={{flexGrow: 1}}>
                            <h3>Private Key</h3><textarea id="area_private_key" className="textarea mt1"
                                                          rows={15}></textarea>
                        </div>
                        <div className="mid-menus">
                            <div>
                                <select id="select_key_size" className="select" defaultValue={1024}>
                                    <option value="512">512 bit</option>
                                    <option value="1024">1024 bit</option>
                                    <option value="2048">2048 bit</option>
                                    <option value="4096">4096 bit</option>
                                </select>
                                <select id="select_encode" className="select mt1" defaultValue={"pem"}>
                                    <option value="pem">pem</option>
                                    <option value="base64">base64</option>
                                </select>
                                <button className="button primary" id="generateBtn">生成密钥</button>
                            </div>
                        </div>
                        <div style={{flexGrow: 1}}>
                            <h3>Public Key</h3><textarea id="area_public_key" className="textarea mt1"
                                                         rows={15}></textarea>
                        </div>
                    </div>

                    <div className="flex mt2">
                        <div style={{flexGrow: 1}}>
                            <h3>原文</h3><textarea id="area_original_text" className="textarea mt1" rows={15}></textarea>
                        </div>
                        <div className="mid-menus">
                            <div>
                                <button className="button" id="encryptBtn">
                                    <span>加密</span>
                                    <i className="fa fa-arrow-right"></i></button>
                                <button className="button" id="decryptBtn">
                                    <i className="fa fa-arrow-left"></i><span>解密</span></button>
                            </div>
                        </div>
                        <div style={{flexGrow: 1}}>
                            <h3>密文</h3><textarea id="area_cipher_text" className="textarea mt1" rows={15}></textarea>
                        </div>
                    </div>
                </div>
            </Layout>
        )

    }
}

