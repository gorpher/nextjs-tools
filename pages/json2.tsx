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
        this.storageKey = 'json2'
        this.siteTitle = 'JSON转换工具'
        this.keyword = '在线JSON转Golang Struct工具,JSON转Golang 结构体,JSON转Struct,JSON转Go,JSON转XML,JSON转Yaml,JSON转CSV'
        this.description = '在线JSON转Golang Struct工具,JSON转Golang 结构体,JSON转Struct,JSON转Go,JSON转XML,JSON转Yaml,JSON转CSV'
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
                <link href="https://cdn.bootcss.com/highlight.js/9.15.9/styles/idea.min.css" rel="stylesheet"/>
            }
                    script={
                        <>
                            <script src="https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/highlight.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/languages/json.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/languages/go.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/languages/yaml.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/languages/xml.min.js"/>
                            <script src="https://cdn.bootcss.com/highlight.js/9.15.9/languages/plaintext.min.js"/>
                            <script src="https://cdn.bootcss.com/fast-xml-parser/3.12.16/parser.min.js"/>
                            <script src="https://cdn.bootcss.com/js-yaml/3.13.1/js-yaml.min.js"/>
                            <script src="https://cdn.bootcdn.net/ajax/libs/json2csv/5.0.5/json2csv.umd.min.js"/>
                            <script src="/js/json2.js" async={false}/>
                        </>
                    }
            >
                <div className="flex mt1">
                    <div className="editarea" id="onpaste"><label>JSON</label>
                        <pre id="input" className="textarea fullHeight fixed-size" contentEditable="true"/>
                    </div>
                    <div className="mid-menus">
                        <div>
                            <button className="button primary" id="toYaml"><i
                                className="fa fa-arrow-right fa-icon"/>YAML
                            </button>
                            <button className="button primary" id="toXml"><i
                                className="fa fa-arrow-right fa-icon"/>XML
                            </button>
                            <button className="button primary" id="toCSV"><i
                                className="fa fa-arrow-right fa-icon"/>csv
                            </button>
                            <button className="button primary" id="toStruct">结构体-展开</button>
                            <button className="button primary" id="toStruct2">结构体-嵌套</button>
                            <button className="button" id="toFormatJson">格式化</button>
                            <button className="button" id="toFormatJson2">压缩</button>
                            <button className="button" data-clipboard-action="copy" data-clipboard-target="#output">复制
                            </button>
                            <button className="button" id="cleanup">清空</button>
                        </div>
                    </div>
                    <div className="editarea"><label>GO/XMl/Yaml/CSV</label>
                        <pre className="textarea fullHeight fixed-size"><code id="output"/></pre>
                    </div>
                </div>
            </Layout>
        )

    }
}

