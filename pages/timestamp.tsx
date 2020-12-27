import React from "react";
import Clock from "../components/clock";
import DateTranslate from "../components/date";
import {Layout} from "../components/layout";


export default class Page extends React.Component<any> {
    private readonly siteTitle: string;

    constructor(props) {
        super(props);
        this.siteTitle = "时间戳转换"
    }

    render() {
        return (
            <Layout siteTitle={this.siteTitle}>
                <Clock/>
                <DateTranslate/>
            </Layout>
        );
    }
}
