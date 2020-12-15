import React from "react";

export default function Dropdown({menus}:{
    menus:{url: string, title: string, kind: string}[]
}) {
    return (
        <>
            <div className="dropdown">
                <button className="dropbtn">{menus[0].kind}</button>
                <div className="dropdown-content">
                    {
                        menus.map(menu=>(<a key={menu.url} href={menu.url}>{menu.title}</a>))
                    }
                </div>
            </div>
            <style jsx >
                {`
                /* 下拉按钮样式 */
                .dropbtn {
                    background-color: #FFFFFF;
                    color: #696969;
                    padding: 16px;
                    font-size: 16px;
                    border: none;ƒ
                    cursor: pointer;
                }
                
                /* 容器需要定位下拉内容 */
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                
                /* 下拉内容 (默认隐藏) */
                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: #f9f9f9;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                }
                
                /* 下拉菜单的链接 */
                .dropdown-content a {
                    color: #696969;
                    padding: 12px 16px;
                    font-size: 14px;
                    text-decoration: none;
                    display: block;
                     -webkit-text-decoration: none;
                    text-decoration: none;
                    -webkit-transition: color 0.2s ease;
                    transition: color 0.2s ease;
                }
                
                /* 鼠标移上去后修改下拉菜单链接颜色 */
                .dropdown-content a:hover {background-color: #f1f1f1}
                
                /* 在鼠标移上去后显示下拉菜单 */
                .dropdown:hover .dropdown-content {
                    display: block;
                }
                
                /* 当下拉内容显示后修改下拉按钮的背景颜色 */
                .dropdown:hover .dropbtn {
                   color: #000;
                }`}
            </style>
        </>
    )
}