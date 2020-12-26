function Init() {

    let img_input = document.getElementById('img_input');
    let file_name = document.getElementById('file_name');
    let area_base64 = document.getElementById('area_base64');


    function loadImage(file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            file_name.innerHTML = file.name + `&nbsp;&nbsp;<a>[${formatSize(file.size)}]</a>`;
            img_input.innerHTML = `<img src="${e.target.result}">`;
            area_base64.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function formatSize(size, len, units) {
        let unit;
        units = units || ['B', 'K', 'M', 'G', 'TB'];
        while ((unit = units.shift()) && size > 1024) {
            size = size / 1024;
        }
        return (unit === 'B' ? size : size.toFixed(len === undefined ? 2 : len)) + unit;
    }


    document.addEventListener('paste', function (event) {
        if (event.clipboardData || event.originalEvent) {
            let data = (event.clipboardData || event.originalEvent.clipboardData);
            if (data.items) {
                let items = data.items, len = items.length, blob = null;
                for (let i = 0; i < len; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        blob = items[i].getAsFile();
                        loadImage(blob);
                    }
                }
            }
        }
    })

    document.getElementById('input_file').addEventListener('change', (e) => {
        loadImage(e.currentTarget.files[0]);
        e.currentTarget.value = null;
    })

    document.getElementById('cleanBtn').addEventListener('click', (e) => {
        img_input.innerText = '';
        file_name.innerText = '';
        area_base64.value = '';
    })

    document.getElementById('base64Btn').addEventListener('click', () => {
        let base64 = area_base64.value;
        if (!base64) {
            return
        }
        if (!base64.startsWith('data:image')) {
            base64 = 'data:image/jpeg;base64,' + base64
        }
        img_input.innerHTML = `<img src="${base64}">`;
    })

}

