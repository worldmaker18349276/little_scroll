define(['base/js/namespace'], function(Jupyter) {
    function load_ipython_extension() {
        document.getElementById('site').style.scrollBehavior = 'smooth';

        Jupyter.notebook.config.loaded.then(function() {
            var step = Jupyter.notebook.config.data.littlescroll_step;

            var littledown = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll down a little',
                help_index : 'zz',
                handler    : function() { document.getElementById('site').scrollBy(0,  step); }
            }, 'scroll-down-a-little', 'little_scroll');
            var littleup = Jupyter.keyboard_manager.actions.register({
                help       : 'Scroll up a little',
                help_index : 'zz',
                handler    : function() { document.getElementById('site').scrollBy(0, -step); }
            }, 'scroll-up-a-little', 'little_scroll');

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