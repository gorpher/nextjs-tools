import React from "react";
import Clock from "../components/clock";
import DateTranslate from "../components/date";
import {Layout} from "../components/layout";


export default class Page extends React.Component<any> {
    private readonly siteTitle: string;
    private readonly description: string;
    private readonly keyword: string;

    constructor(props) {
        super(props);
        this.siteTitle = "Unix时间戳转换"
        this.keyword = 'Unix时间戳,时间戳,时间戳转换,毫秒,北京时间'
        this.description = '在线Unix时间戳转换,时间戳,时间戳转换,毫秒,北京时间'
    }

    render() {
        return (
            <Layout siteTitle={this.siteTitle} keyword={this.keyword} description={this.description}>
                <Clock/>
                <DateTranslate/>
            </Layout>
        );
    }
}
