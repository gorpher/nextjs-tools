import styles from "./layout.module.css";
import React from "react";
import Route from "./route";

export default function Nav() {
    const routes = Route()
    return (<>
        <div className={styles.links}>
            <a>
                <figure><img src="/images/favicon.svg"/></figure>
            </a>
            <a href="/" className={styles.mute}>幸运三叶草</a>
        </div>
        <nav>
            {
                routes.map((items,index) => <div  key={index}>
                    <p>{items[0]&&items[0].kind}</p>
                    <ul>
                        {items.map(item => <li key={item.url}><a href={item.url} >{item.title}</a></li>)}
                    </ul>
                </div>)
            }
        </nav>
    </>)
}