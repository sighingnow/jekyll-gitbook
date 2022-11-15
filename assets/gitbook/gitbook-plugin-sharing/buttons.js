

//Enter Social Links
// { platform: CAMC,           user_url: "https://www.camcmedicine.edu/academic-departments/department-internal-medicine/internal-medicine-residency-program/our-current"}
// { platform: facebook,       user_url: "https://www.facebook.com/Straley/" }
// { platform: github,         user_url: "https://github.com/jzstraley" }
// { platform: google_scholar, user_url: "" }
// { platform: instagram,      user_url: "" }
// { platform: linkedin,       user_url: "https://www.linkedin.com/in/jamesstraley" }
// { platform: orcid,          user_url: "https://orcid.org/0000-0002-5441-9515" }
// { platform: pinterest,      user_url: "" }
// { platform: twitter,        user_url: "" }
// { platform: youtube,        user_url: "https://www.youtube.com/channel/UCAAanG5A04oCXc2JnTjjLRQ" }


require(['gitbook', 'jquery'], function(gitbook, $) {
    var SITES = {
        'facebook': {
            'label': 'Facebook',
            'icon': 'fa fa-facebook',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://www.facebook.com/Straley/');
            }
        },
        'github': {
            'label': 'Github',
            'icon': 'fa fa-github',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://github.com');
            }
        },
        'google': {
            'label': 'Google+',
            'icon': 'fa fa-google-plus',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://plus.google.com/share?url='+encodeURIComponent(location.href));
            }
        },
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