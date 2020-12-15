import Head from 'next/head'
import React from "react";
import Route from "./route";
import styles from "./header.module.css"

export default function Layout({children, home, siteTitle}: {
    children: React.ReactNode
    home?: boolean
    siteTitle: string
}) {
    const routes = Route()

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
                <meta name="description" content="开发工具"
                />
                <meta name="og:title" content={siteTitle}/>
            </Head>
            {home ? (<main> {children}</main>) : (
                <main className="container">
                    <div className="left">
                        <h3>{siteTitle}</h3>
                        {children}

                    </div>
                    <div className="right">
                        <div className={styles.links}>
                            <a>
                                <figure><img src="/images/favicon.svg"/></figure>
                            </a>
                            <a href="/" className={styles.mute}>幸运三叶草</a>
                        </div>
                        <nav>
                            {
                                routes.map(items => <>
                                    <p>{items[0].kind}</p>
                                    <ul>
                                        {items.flat().map(item => <li key={item.url}><a href={item.url}>{item.title}</a>
                                        </li>)}
                                    </ul>
                                </>)
                            }
                        </nav>
                    </div>
                </main>)}
            <style jsx>{`
             .container {
                    height: 960px;
                    display:grid;
                    grid-template-columns: auto 1fr;
                    grid-gap:5px;
                }
                .left {
                   padding:20px;

                }
                .right {
                    overflow-y: auto;
                    width: 280px;
                    border-right: 1px solid #ddd;
                }
                li {
                    display: list-item;
                    text-align: -webkit-match-parent;
                }
                a {
                    color: #3498db;
                    cursor: pointer;
                    text-decoration: none;
                }
                 
            `}</style>
        </div>
    )
}
