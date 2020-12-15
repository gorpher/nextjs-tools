export default function Route() {
    return [
        [
            {url: "/json", title: 'JSON格式化', kind: 'json'},
            {url: "/json2xml", title: 'JSON/XML转换', kind: 'json'},
            {url: "/json2yaml", title: 'JSON/YAML转换', kind: 'json'},
            {url: "/JSON转Go Struct", title: 'JSON/GO', kind: 'json'},
        ],
        [
            {url: "/aes", title: 'AES加密解密', kind: "加密"},
            {url: "/des", title: 'DES加密/解密', kind: "加密"},
            {url: "/rsa", title: 'RSA加密/解密', kind: "加密"},
            {url: "/base64", title: 'Base64', kind: "加密"},
            {url: "/img2base64", title: '图片Base64编码', kind: "加密"},
        ],
        [
            {url: "/timestamp", title: 'Unix时间戳', kind: "转换"},
            {url: "/morse", title: '摩斯电码', kind: "转换"},
            {url: "/color", title: '颜色值转换', kind: "转换"},
            {url: "/binary", title: '进制转换', kind: "转换"},
            {url: "/url", title: 'URL编码解码', kind: "转换"},
            {url: "/unicode", title: 'Unicode编码转换', kind: "转换"},
            {url: "/pdf2img", title: 'PDF转图片', kind: "转换"},
        ],
        [
            {url: "/hash", title: 'Hash计算', kind: "Hash"},
            {url: "/hashf", title: '文件Hash计算', kind: "Hash"},
        ],
        [
            {url: "/ip", title: 'IP地址查询', kind: "其他"},
            {url: "/qrcode", title: '二维码制作'},
            {url: "/websocket", title: 'WebSocket测试', kind: "其他"},
            {url: "/tinyimg", title: '图片压缩', kind: "其他"},
            {url: "/regex", title: '正则表达式', kind: "其他"},
            {url: "/svg", title: 'SVG占位图', kind: "其他"},

        ],
    ]
}