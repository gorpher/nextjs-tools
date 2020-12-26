function Init() {
    let json_editor = new JSONEditor(document.getElementById("json_editor"), {mode: 'code'});
    let tree_editor = new JSONEditor(document.getElementById("tree_editor"), null);
    json_editor.setText('');
    document.getElementById('toTree').addEventListener('click', ()=> {
        if (json_editor.getText()) {
            json_editor.format();
            tree_editor.set(JSON.parse(json_editor.getText()));
            tree_editor.expandAll();
        }
    })

    document.getElementById('toJson').addEventListener('click', ()=> {
        json_editor.setText(JSON.stringify(tree_editor.get(), null, 2))
    })

    document.getElementById('cleanup').addEventListener('click',   ()=> {
        json_editor.setText('');
        tree_editor.set({})
    })
}