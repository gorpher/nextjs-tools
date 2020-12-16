import Head from 'next/head'
import React from "react";
import Route from "./route";
import styles from "./layout.module.css"
import Dropdown from "./dropdown";

export function Middle({children}: {
    children: React.ReactNode
}) {
    return (<div className={styles.middle}>{children}</div>)
}

export function Left({children}: {
    children: React.ReactNode
}) {
    return (<div className={styles.left}>{children}</div>)
}

export function Right({children}: {
    children: React.ReactNode
}) {
    return (<div className={styles.right}>{children}</div>)
}

export function Header() {
    const menus = Route()
    return (
        <header className={styles.sticky}>
            <div>
                <div className={styles.links}>
                    <a title="homepage" href="/">
                        <img src="/images/favicon.svg"/>
                    </a>
                    {
                        menus.map((menus: [], index) => (<Dropdown key={index} menus={menus}/>))
                    }
                </div>
            </div>
        </header>
    )

}


export function Layout({children, left, right, siteTitle}: {
    children: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
    siteTitle?: string
}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="baidu-site-verification" content="code-Xbqjfarq6u" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
                <meta name="description" content="开发工具"/>
                <meta name="og:title" content={siteTitle}/>
            </Head>
            <Header/>
            <div className={styles.container}>
                <Left>{left}</Left>
                <Middle>
                    {siteTitle && (<h3>{siteTitle}</h3>)}
                    {children}
                </Middle>
                <Right>
                    {right}
                </Right>
            </div>
        </>
    )
}
