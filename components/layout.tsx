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


export function Layout({children, left, right, siteTitle, link, script, description, keyword}: {
    children: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
    link?: React.ReactNode
    script?: React.ReactNode
    siteTitle?: string
    keyword?: string
    description?: string
}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="baidu-site-verification" content="code-Xbqjfarq6u"/>
                <link href="https://cdn.bootcss.com/font-awesome/5.10.0-11/css/all.min.css" rel="stylesheet"/>

                {
                    link
                }
                <meta name="description" content={description}/>
                <meta name="keywords" content={keyword}/>
                {
                    siteTitle ? (
                        <>
                            <meta name="og:title" content={siteTitle + '｜' + '在线工具 - AlaTools'}/>
                            <title>{siteTitle + '｜' + '在线工具 - AlaTools'}</title>
                        </>
                    ) : (
                        <>
                            <meta name="og:title" content={'我的在线工具 - AlaTools'}/>
                            <title>{'我的在线工具 - AlaTools'}</title>
                        </>
                    )
                }
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
            {
                script
            }
        </>
    )
}
