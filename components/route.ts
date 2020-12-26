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
            {url: "/hashf", title: '文件Hash', kind: "编码"},
            {url: "/url", title: 'URL编码解码', kind: "编码"},
            {url: "/unicode", title: 'Unicode编码', kind: "编码"},
        ],
        [
            {url: "/timestamp", title: 'Unix时间戳', kind: "转换"},
            {url: "/pdf2img", title: 'PDF转图片', kind: "转换"},
        ],
        [
            {url: "/ip", title: 'IP地址查询', kind: "其他"},
            {url: "/qrcode", title: '二维码制作'},
            {url: "/websocket", title: 'WebSocket测试', kind: "其他"},
            {url: "/tinyimg", title: '图片压缩', kind: "其他"},
            {url: "/regex", title: '正则表达式', kind: "其他"},
        ],
    ]
}
