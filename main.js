define(['jquery', 'base/js/namespace'], function($, Jupyter) {
    function load_ipython_extension() {
        Jupyter.notebook.config.loaded.then(function() {
            var settings = $.extend({step:0.3, step_in_edit:20}, Jupyter.notebook.config.data.LittleScroll);

            var littledown = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll down a little',
                help_index : 'zz',
                handler    : function() { Jupyter.notebook.scroll_manager.scroll( settings.step); }
            }, 'scroll-down-a-little', 'little_scroll');
            var littleup = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll up a little',
                help_index : 'zz',
                handler    : function() { Jupyter.notebook.scroll_manager.scroll(-settings.step); }
            }, 'scroll-up-a-little', 'little_scroll');

            document.addEventListener('keydown', function(e){
                if (document.body.classList.contains('edit_mode')) {
                    if (e.ctrlKey && e.keyCode == 40) {
                        document.getElementById('site').scrollBy(0,  settings.step_in_edit);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    } else if (e.ctrlKey && e.keyCode == 38) {
                        document.getElementById('site').scrollBy(0, -settings.step_in_edit);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }
            }, true);
            
            Jupyter.keyboard_manager.command_shortcuts.add_shortcuts({
                'ctrl-down' : littledown,
                'ctrl-up'   : littleup
            });
        });
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});