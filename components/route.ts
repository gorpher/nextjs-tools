export default function Route() {
    return [
        [
            {url: "/json", title: 'JSON格式化', kind: 'json'},
            {url: "/json2xml", title: 'JSON/XML转换', kind: 'json'},
            {url: "/json2yaml", title: 'JSON/YAML转换', kind: 'json'},
            {url: "/JSON转Go Struct", title: 'JSON/GO', kind: 'json'},

        ],

        [
            {url: "/aes", title: 'AES加密解密', kind: "加解密"},
            {url: "/des", title: 'DES加密/解密', kind: "加解密"},
            {url: "/rsa", title: 'RSA加密/解密', kind: "加解密"},
        ],
        [
            {url: "/base64", title: 'Base64', kind: "其他"},
            {url: "/hash", title: 'Hash', kind: "其他"},
            {url: "/timestamp", title: 'Unix时间戳', kind: "其他"},
            {url: "/ip", title: 'IP地址查询', kind: "其他"},
            {url: "/qrcode", title: '二维码制作'},
            {url: "/websocket", title: 'WebSocket测试', kind: "其他"},
            {url: "/tinyimg", title: '图片压缩', kind: "其他"},
            {url: "/regex", title: '正则表达式', kind: "其他"},

        ],
    ]
}