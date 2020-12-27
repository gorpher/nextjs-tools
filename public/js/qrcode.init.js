function Init() {
    let img_qrcode = document.getElementById('img_qrcode');
    img_qrcode.crossOrigin = '*';
    let area_text = document.getElementById('area_text');
    let generateBtn = document.getElementById('generate_btn');
    let saveBtn = document.getElementById('save_btn');
    let text_help = document.getElementById('text_help');
    let input_size = document.getElementById('input_size');
    let input_icon_width = document.getElementById('input_icon_width');
    let input_icon_radius = document.getElementById('input_icon_radius');
    let input_icon_curtain_size = document.getElementById('input_icon_curtain_size');
    let input_icon_curtain_offset = document.getElementById('input_icon_curtain_offset');
    let input_fg = document.getElementById('input_fg');
    let input_bg = document.getElementById('input_bg');
    let select_level = document.getElementById('select_level');
    let input_icon_src = document.getElementById('input_icon_src');
    let input_icon_color = document.getElementById('input_icon_color');
    let input_icon_curtain_img = document.getElementById('input_icon_curtain_img');
    let input_icon_curtain_bgcolor = document.getElementById('input_icon_curtain_bgcolor');

    let generate = function () {
        img_qrcode.innerHTML = '';
        img_qrcode.style.visibility = 'hidden';
        if (!area_text.value) {
            area_text.classList.add('error');
            return
        }
        let size = parseInt(input_size.value);
        if (size <= 0 || size > 1000) {
            return;
        }

        let iconBorderWidth = parseInt(input_icon_width.value);
        if (iconBorderWidth < 0 || iconBorderWidth > 100) {
            return;
        }
        let iconRadius = parseInt(input_icon_radius.value);
        if (iconRadius < 0 || iconRadius > 100) {
            return;
        }
        let curtainSize = parseInt(input_icon_curtain_size.value);
        if (curtainSize < 0 || curtainSize > 1000) {
            return;
        }
        let curtainOffset = parseInt(input_icon_curtain_offset.value);
        if (curtainOffset < 0 || curtainOffset > 500) {
            return;
        }
        try {

            new QRCode('img_qrcode', {
                text: area_text.value,
                width: size,
                height: size,
                colorDark: input_fg.value,
                colorLight: input_bg.value,
                correctLevel: parseInt(select_level.value),
                iconSrc: input_icon_src.value ? input_icon_src.value : undefined, //二维码中心图片
                iconBorderWidth: iconBorderWidth,//二维码中心图片边框宽度
                iconRadius: iconRadius,//二维码中心图片边框弧度
                iconBorderColor: input_icon_color.value,//二维码中心图片边框颜色
                curtainWidth: curtainSize, //外围幕布（或画布）的宽度
                curtainHeight: curtainSize, //外围幕布（或画布）的高度
                //外围幕布（或画布）图片(图片可以使用透明或不透明的)
                curtainImg: input_icon_curtain_img.value ? input_icon_curtain_img.value : undefined,
                // curtainImg: "http://img.matosiki.site/avatar.jpg" || undefined,
                curtainBgColor: input_icon_curtain_bgcolor.value ? input_icon_curtain_bgcolor.value : undefined, //外围幕布（或画布）底色(底色和图片同时设置时，显示底色)
                //二维码相对外围幕布（或画布）的X偏移
                qrcodeOffsetX: curtainOffset,
                //二维码相对外围幕布（或画布）的Y偏移
                qrcodeOffsetY: curtainOffset,
            });
            setTimeout(() => img_qrcode.style.visibility = 'visible');
        } catch (e) {
            area_text.classList.add('error');
            let text_help = document.getElementById('text_help');
            text_help.classList.add('text-error');
            text_help.innerText = '内容过多'
        }
    }

    let onInputText = function (e) {
        e.classList.remove('error');
        text_help.classList.remove('text-error');
        text_help.innerText = '字数越多，越不易扫描';
    }

    let save = function () {
        let url = img_qrcode.getElementsByTagName('canvas')[0].toDataURL("image/png");
        let a = document.createElement('a');
        let event = new MouseEvent('click');
        a.download = 'qrcode_' + Math.round(new Date() / 1000);
        a.href = url;
        a.dispatchEvent(event)
    }

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', function (event) {
            generate()
        })
    }

    area_text.addEventListener("paste", () => setTimeout(generate, 1))
    area_text.addEventListener('focusin', ev => onInputText(ev.currentTarget))
    generateBtn.addEventListener('click', () => generate())
    saveBtn.addEventListener('click', () => save())
}

