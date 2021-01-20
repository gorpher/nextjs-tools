export default function Route() {
    return [
        [
            {url: "/json", title: 'JSON格式化', kind: 'json'},
            {url: "/json2", title: 'JSON转换', kind: 'json'},
        ],
        [
            {url: "/aes", title: 'AES加密解密', kind: "加密"},
            {url: "/des", title: 'DES加密/解密', kind: "加密"},
            {url: "/rsa", title: 'RSA加密/解密', kind: "加密"},
        ],
        [
            {url: "/base64", title: 'Base64', kind: "编码"},
            {url: "/img2base64", title: '图片Base64', kind: "编码"},
            {url: "/hash", title: 'Hash计算', kind: "编码"},
            {url: "/unicode", title: 'Unicode编码', kind: "编码"},
        ],
        [
            {url: "/timestamp", title: 'Unix时间戳', kind: "实用"},
            {url: "/qrcode", title: '二维码制作', kind: "实用"},
            {url: "/websocket", title: 'WebSocket测试', kind: "其他"},
        ],
        [{
            url: "https://www.matosiki.site/html/%E8%87%AA%E5%8A%A8%E9%85%8D%E8%89%B2%E5%B7%A5%E5%85%B700.html",
            title: '自动配色工具1',
            kind: "配色工具"
        },
            {
                url: "https://www.matosiki.site/html/%E8%87%AA%E5%8A%A8%E9%85%8D%E8%89%B2%E5%B7%A5%E5%85%B701.html",
                title: '自动配色工具2',
                kind: "配色工具"
            },
            {
                url: "https://www.matosiki.site/html/%E8%87%AA%E5%8A%A8%E9%85%8D%E8%89%B2%E5%B7%A5%E5%85%B702.html",
                title: '自动配色工具3',
                kind: "配色工具"
            },
        ],
        [
            {
                url: "https://www.matosiki.site/html/%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE%E5%9D%90%E6%A0%87%E8%BD%AC%E6%8D%A2%E5%B7%A5%E5%85%B7.html",
                title: '高德坐标转换工具',
                kind: "其他"
            },
            {url: 'https://thispersondoesnotexist.com', title: '人脸头像在线生成', kind: "其他"},
            {url: "https://oktools.net/ip", title: 'IP地址查询', kind: "其他"},
            {url: "https://oktools.net/tinyimg", title: '图片压缩', kind: "其他"},
            {url: "https://oktools.net/regex", title: '正则表达式', kind: "其他"},
        ],
    ]
}
