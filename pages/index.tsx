import Head from 'next/head'
import {Layout} from '../components/layout'
import Grid from '../components/grid'
import React from "react";

export default function Home() {
    return (
        <Layout keyword="在线工具,工具,开发工具,二维码,JSON格式化,Unix时间戳,Base64,MD5,加密解密"
                description="AlaTools是一个在线工具网站。使用React.js实现快速响应页面，提供二维码制作、JSON格式化、Unix时间戳转换、Base64编码、加密解密、图片压缩、IP查询、Hash计算等常用工具。">
            <Grid/>
        </Layout>
    )
}
