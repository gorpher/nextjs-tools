import {Layout} from "../components/layout";
import React from "react";
import CryptoJS from 'crypto-js';
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
        this.storageKey = 'websocket'
        this.siteTitle = 'websocket'
        this.keyword = 'websocket'
        this.description = 'websocket'
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


    render() {
        return (
            <Layout siteTitle={this.siteTitle} right={<Nav/>} script={
                <script src="/js/websocket.js"/>
            }>
                <div>
                    <div className="flex mt2"><label className="group fullwidth"><span className="static">地址</span>
                        <input id="input_server" className="input" placeholder="ws://localhost:8080/websocket"/></label>
                        <div className="group" style={{marginLeft: '1rem', flexGrow: 15}}>
                            <button className="button" id="connect_btn">连接</button>
                            <button className="button" id="disconnect_btn">断开</button>
                            <button className="button" id="clean_btn">清空</button>
                        </div>
                    </div>
                    <div id="msg_list" className="tile bordered mt2">
                        <p className="text-error">注意websocket的跨域设置</p>
                    </div>
                    <div className="group fullwidth mt2"><span className="static">消息</span>
                        <input id="input_msg" className="input"/>
                        <button className="button primary" id="send_btn">发送</button>
                    </div>
                    <style jsx>
                        {
                            ` #msg_list {
                        padding: 8px 16px;
                        height: 70vh;
                        font-size: 14px;
                        overflow: auto
                    }`
                        }
                    </style>
                </div>
            </Layout>
        )

    }
}

