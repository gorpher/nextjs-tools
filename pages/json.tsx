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
        this.storageKey = 'json'
        this.siteTitle = 'json在线编辑格式化'
        this.keyword = 'json在线编辑格式化'
        this.description = 'json在线编辑格式化'
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
