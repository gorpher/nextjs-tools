import {Layout} from "../components/layout";
import React, {useState} from "react";
import Nav from "../components/nav";

interface isState {
}

export default class Page extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'json'
        this.siteTitle = 'JSON在线编辑格式化'
        this.keyword = 'JSON,JSON解析,JSON格式化,JSON编辑'
        this.description = '在线JSON格式化工具,JSON解析,JSON格式化,JSON编辑'
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
            <Layout  siteTitle={this.siteTitle} keyword={this.keyword} description={this.description}  right={<Nav/>} link={
                <link href="https://cdn.bootcss.com/jsoneditor/6.1.0/jsoneditor.min.css" rel="stylesheet"
                      type="text/css"/>
            }
                    script={
                        <>
                            <script src="https://cdn.bootcss.com/jsoneditor/6.1.0/jsoneditor.min.js"/>
                            <script src="/js/json.js"/>
                        </>
                    }
            >
                <div className="flex mt2">
                    <div id="json_editor" className="editarea">
                    </div>
                    <div className="mid-menus">
                        <div>
                            <button className="button primary toPage" ><i
                                className="fa fa-arrow-right fa-icon"/>YAML
                            </button>
                            <button className="button primary toPage"><i
                                className="fa fa-arrow-right fa-icon"/>XML
                            </button>
                            <button className="button primary toPage"><i
                                className="fa fa-arrow-right fa-icon"/>csv
                            </button>
                            <button className="button primary toPage">结构体-展开</button>
                            <button className="button primary toPage" >结构体-嵌套</button>
                            <button className="button" id="toTree">
                                <i className="fa fa-arrow-right"></i></button>
                            <button className="button" id="toJson">
                                <i className="fa fa-arrow-left"></i></button>
                            <button className="button" id="cleanup">清空</button>
                        </div>
                    </div>
                    <div id="tree_editor" className="editarea"></div>
                </div>
            </Layout>
        )

    }
}

