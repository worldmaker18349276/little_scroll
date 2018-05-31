define(['base/js/namespace'], function(Jupyter) {
    function load_ipython_extension() {
        Jupyter.notebook.config.loaded.then(function() {
            var step = Jupyter.notebook.config.data.littlescroll_step;
            var step_edit = 20;

            var littledown = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll down a little',
                help_index : 'zz',
                handler    : function() { document.getElementById('site').scrollBy({left:0,  top: step, behavior:'smooth'}); }
            }, 'scroll-down-a-little', 'little_scroll');
            var littleup = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll up a little',
                help_index : 'zz',
                handler    : function() { document.getElementById('site').scrollBy({left:0,  top:-step, behavior:'smooth'}); }
            }, 'scroll-up-a-little', 'little_scroll');

            document.addEventListener('keydown', function(e){
                if (e.ctrlKey && e.keyCode == 40) {
                    if (document.body.classList.contains('edit_mode'))
                        document.getElementById('site').scrollBy({left:0,  top: step_edit, behavior:'auto'});
                    else
                        document.getElementById('site').scrollBy({left:0,  top: step, behavior:'smooth'});
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                } else if (e.ctrlKey && e.keyCode == 38) {
                    if (document.body.classList.contains('edit_mode'))
                        document.getElementById('site').scrollBy({left:0,  top:-step_edit, behavior:'auto'});
                    else
                        document.getElementById('site').scrollBy({left:0,  top:-step, behavior:'smooth'});
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }, true);

//             Jupyter.keyboard_manager.command_shortcuts.add_shortcuts({
//                 'ctrl-down' : littledown,
//                 'ctrl-up'   : littleup
//             });
//             Jupyter.keyboard_manager.edit_shortcuts.add_shortcuts({
//                 'ctrl-down' : littledown,
//                 'ctrl-up'   : littleup
//             });
        });
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});