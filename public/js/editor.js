$(function () {
    var editorPanel = $('#editorPanel').get(0);
    var w = $('#editorPanel').css('width');
    var h = $('#editorPanel').css('height');
    // 编辑器
    var editor = CodeMirror.fromTextArea(editorPanel, {
        mode: 'text/html',
        theme: 'ambiance',
        indentUnit: 4,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        styleActiveLine: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchTags: { bothTags: true }
    });
    // 设置编辑器宽高
    editor.setSize(w, h);
    // 设置编辑器自动换行
    editor.setOption('lineWrapping', true);

    //监听事件
    $(window).keydown(function (event) {
        updateCursorPanel();
    });
    $('.contentPanel').on('click', '.CodeMirror', function () {
        updateCursorPanel();
    });
    // 更新光标位置
    var cursor = {};
    function updateCursorPanel() {
        cursor.l = editor.getCursor().line || 0;
        cursor.c = editor.getCursor().ch || 0;
        $('#cursorPanel').html(cursor.l + ':' + cursor.c);
    }
    updateCursorPanel();
});

