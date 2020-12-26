import {Layout} from "../components/layout";
import React, {useState} from "react";
import Nav from "../components/nav";

interface isState {

}

export default class Base64 extends React.Component<any, isState> {
    private readonly storageKey: string;
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.storageKey = 'img2base64'
        this.siteTitle = '图片Base64编码'
        this.keyword = '图片Base64编码'
        this.description = '图片Base64编码'
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {}
    }


    componentDidMount() {
        if (typeof window !== 'undefined') {
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
            <Layout siteTitle={this.siteTitle} right={<Nav/>}
                    script={
                        <script src="/js/img2base64.js"></script>
                    }
            >
                <div>
                    <div className="file fullwidth mt2">
                    <span className="file-cta">
                    <input id="input_file" className="file-input" type="file"
                           accept="image/png,image/jpeg,image/gif,image/jpg"/>
                    <span className="file-icon"><i className="fas fa-upload fa-icon"/></span>
                        <span className="file-button">选择一张图片</span>
                    </span>
                        <span id="file_name" className="file-name"/>
                    </div>
                    <div id="img_input" className="textarea mt2" contentEditable="true"
                         style={{minHeight: "18em", height: "auto", overflow: "auto"}}>
                    </div>
                    <div className="content-center mt2">
                        <button className="button" id="base64Btn">
                            <i className="fa fa-arrow-up"/><span>Base64还原图片</span></button>
                        <button className="button" id="cleanBtn">
                            <span>清空</span></button>
                    </div>
                    <textarea id="area_base64" className="textarea mt2" rows={20}/>
                </div>
            </Layout>
        )

    }
}

