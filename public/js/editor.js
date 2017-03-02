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
    window.editor = editor;
    // 设置编辑器宽高
    editor.setSize('auto', h);
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
    // 处理开启实时预览时候的容器样式
    function previewLayout () {
        var w = document.body.clientWidth;
        $('.contentPanel').css({'width': w / 2 + 'px'});
        $('#preview').css({
            'left': w / 2 + 'px',
            'width': w / 2 + 'px'
        }).show();
        resetIframe();
    }
    // 处理关闭实时预览时候的容器样式
    function previewLayoutClose () {
        var w = document.body.clientWidth;
        $('.contentPanel').css({'width': w + 'px'});
        $('#preview').hide();
    }
    // 处理预览界面
    function resetIframe () {
        var codeText = editor.getValue();
        var content = window.frames['result'].document;
        content.open();
        content.write(codeText);
        content.close();
    }

    // 实时预览
    var timer = null;
    editor.on('change', function () {
        if (window.frames['result']) {
            clearTimeout(timer);
            timer = setTimeout(resetIframe(), 300);
        }
    });

    // 菜单切换预览界面
    function togglePreview () {
        $('#previewBtn').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                previewLayoutClose();
                $(this).html('开启实时预览');
            } else {
                $(this).addClass('active');
                previewLayout();
                $(this).html('关闭实时预览');
            }
        });
    }
    // 初始化
    function init () {
        previewLayout();
        togglePreview();
    }
    updateCursorPanel();
    init();
});

