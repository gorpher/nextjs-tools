function Init() {
    let json_editor = new JSONEditor(document.getElementById("json_editor"), {mode: 'code'});
    let tree_editor = new JSONEditor(document.getElementById("tree_editor"), null);
    json_editor.setText("");
    let state = JSON.parse(window.localStorage.getItem("json"));
    if (state) {
        json_editor.setText(state.json || "");
    }
    document.getElementById('toTree').addEventListener('click', () => {
        if (json_editor.getText()) {
            json_editor.format();
            tree_editor.set(JSON.parse(json_editor.getText()));
            tree_editor.expandAll();
        }
    })

    document.getElementById('toJson').addEventListener('click', () => {
        json_editor.setText(JSON.stringify(tree_editor.get(), null, 2))
    })

    document.getElementById('cleanup').addEventListener('click', () => {
        json_editor.setText('');
        tree_editor.set({})
    })
    let elements = document.getElementsByClassName('toPage')
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            localStorage.setItem("json", JSON.stringify({
              "json":json_editor.getText()
            }))
            window.open("/json2","_blank")
        };
    }
}
