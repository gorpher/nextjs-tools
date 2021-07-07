import Head from 'next/head'
import { Layout } from '../components/layout'
import Grid from '../components/grid'
import Quick from '../components/quick'

import React from "react";

export default function Index() {
    return (
        <Layout keyword="在线工具,工具,开发工具,二维码,JSON格式化,Unix时间戳,Base64,MD5,加密解密"
            description="AlaTools是一个在线工具网站。提供二维码制作、JSON格式化、Unix时间戳转换、Base64编码、加密解密、图片压缩、IP查询、Hash计算等常用工具。">
            <Quick />
            <Grid />
            <footer style={{ position: "absolute", bottom: 0, height: "2rem" }}>
                <p className="site-description">©️2017-2021 matosiki.site 版权所有.ICP证:<a
                    href="https://beian.miit.gov.cn/#/Integrated/recordQuery" target="_blank"
                    rel="noopener">鄂ICP备16003435号-3</a></p>
            </footer>
        </Layout>
    )
}
