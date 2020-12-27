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
        this.storageKey = 'qrcode'
        this.siteTitle = '在线二维码生成'
        this.keyword = '在线二维码生成'
        this.description = '在线二维码生成'
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
                            <script src="/js/qrcode.js"/>
                            <script src="/js/jscolor.js"/>
                            <script src="/js/qrcode.init.js"/>
                        </>
                    }
            >
                <>
                    <div className="flex mt2" style={{justifyContent: "flex-end"}}>
                        <div style={{flexGrow: 1}}>
                            <div className="control"><textarea id="area_text" className="textarea fixed-size" rows={10}
                                                               maxLength={200}
                                                               placeholder="二维码内容"/>
                                <p id="text_help" className="help text-info">字数越多，越不易扫描</p>
                            </div>
                        </div>
                        <div className="options">
                            <div className="group fullwidth"><span className="static">尺寸(px)</span>
                                <input id="input_size" className="input" type="number" defaultValue="280"
                                />
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">纠错等级</span>
                                <select id="select_level" className="select" defaultValue={"3"}>
                                    <option value="2">H : 高</option>
                                    <option value="3">Q : 中等</option>
                                    <option value="0">M : 低</option>
                                    <option value="1">L : 最低</option>
                                </select>
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">背景颜色</span>
                                <input className="input" id="input_bg" type="text" defaultValue="rgb(255,255,255,1)"
                                       data-jscolor=""/>
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">前景颜色</span>
                                <input className="input" id="input_fg" type="text" defaultValue="rgb(0,0,0,1)"
                                       data-jscolor=""/>
                            </div>
                            <button className="button primary fullwidth mt-2" id="generate_btn">生成二维码</button>
                        </div>
                        <div className="options">
                            <div className="group fullwidth"><span className="static">logo图片</span>
                                <input id="input_icon_src" className="input" type="text"
                                       defaultValue="http://img.matosiki.site/avatar.jpg"/>
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">logo边框宽度</span>
                                <input id="input_icon_width" className="input" type="number" defaultValue="5"
                                />
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">logo边框弧度</span>
                                <input id="input_icon_radius" className="input" type="number" defaultValue="5"
                                />
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">logo边框颜色</span>
                                <input id="input_icon_color" className="input" type="text"
                                       defaultValue="rgb(255,255,255,1)"
                                       data-jscolor=""/>
                            </div>
                        </div>
                        <div className="options">
                            <div className="group fullwidth"><span className="static">画布尺寸(px)</span>
                                <input id="input_icon_curtain_size" className="input" type="number" defaultValue="280"
                                />
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">画布图片</span>
                                <input id="input_icon_curtain_img" className="input" type="text" defaultValue=""/>
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">偏移量</span>
                                <input id="input_icon_curtain_offset" className="input" defaultValue="0" type="number"
                                />
                            </div>
                            <div className="group fullwidth mt-2"><span className="static">画布颜色</span>
                                <input id="input_icon_curtain_bgcolor" className="input" type="text"
                                       defaultValue="rgb(255,255,255,1)"
                                       data-jscolor=""/>
                            </div>
                            <button className="button fullwidth mt-2" id="save_btn">保存图片</button>
                        </div>
                        <div>
                            <figure id="img_qrcode" className="image"/>
                        </div>
                    </div>
                    <div className="content mt-2">
                        <h2>二维码原理</h2>
                        <p> jscolor链接地址:<a href="https://jscolor.com/download/">https://jscolor.com/download/</a>
                        </p>
                        <p>
                            qrcodejs链接地址: <a
                            href="https://github.com/555chy/qrcodejs">https://github.com/555chy/qrcodejs</a>
                            如果出现图片跨域，需要添加跨域属性。
                            (<code>image.crossOrigin="*";</code>)
                        </p>
                        <p>二维条码/二维码可以分为堆叠式/行排式二维条码和矩阵式二维条码。
                            堆叠式/行排式二维条码形态上是由多行短截的一维5条码堆叠而成；
                            矩阵式二维条码以矩阵的形式组成，在矩阵相应元素位置上用“点”表示二进制“1”，
                            用“空”表示二进制“0”，“点”和“空”的排列组成代码。 </p>

                        <h2>数据表示方法</h2>
                        <p>深色模块表示二进制“1”，浅色模块表示二进制“0”。 </p>

                        <h2>纠错能力</h2>
                        <ul>
                            <li>level L : 约可纠错7%的数据码字</li>
                            <li>level M : 约可纠错15%的数据码字</li>
                            <li>level Q : 约可纠错25%的数据码字</li>
                            <li>level H : 约可纠错30%的数据码字</li>
                        </ul>
                    </div>
                </>
            </Layout>
        )

    }
}

