require(['gitbook', 'jquery'], function(gitbook, $) {
    var SITES = {
        'github': {
            'label': 'Github',
            'icon': 'fa fa-github',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://github.com');
            }
        }
    };



    gitbook.events.bind('start', function(e, config) {
        var opts = config.sharing;

        // Create dropdown menu
        var menu = $.map(opts.all, function(id) {
            var site = SITES[id];

            return {
                text: site.label,
                onClick: site.onClick
            };
        });

        // Create main button with dropdown
        if (menu.length > 0) {
            gitbook.toolbar.createButton({
                icon: 'fa fa-share-alt',
                label: 'Share',
                position: 'right',
                dropdown: [menu]
            });
        }

        // Direct actions to share
        $.each(SITES, function(sideId, site) {
            if (!opts[sideId]) return;

            var onClick = site.onClick;

            if (sideId === "github" && opts["github_link"] !== undefined && opts["github_link"] !== "") {
                onClick = function(e) {
                    e.preventDefault();
                    window.open(opts["github_link"]);
                }
            }
            if (sideId === "telegram" && opts["telegram_link"] !== undefined && opts["telegram_link"] !== "") {
                onClick = function(e) {
                    e.preventDefault();
                    window.open(opts["telegram_link"]);
                }
            }

            gitbook.toolbar.createButton({
                icon: site.icon,
                label: site.text,
                position: 'right',
                onClick: onClick
            });
        });
    });
});
