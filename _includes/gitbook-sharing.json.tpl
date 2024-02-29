            "sharing": {
                "facebook": false,

                "google": false,

                "github": true,
              {% if site.github_username %}
                "github_link": "https://github.com/{{ site.github_username }}",
              {% else %}
                "github_link": "https://github.com",
              {% endif %}

                "telegram": false,
                "telegram_link": "https://t.me",

                "instapaper": false,

                "twitter": false,
              {% if site.twitter_username %}
                "twitter_link": "https://twitter.com/{{ site.twitter_username }}",
              {% endif %}
              "linkedin": true,
              {% if site.linkedin_username %}
                "linkedin_link": "https://linkedin.com/in/{{ site.linkedin_username }}",
              {% endif %}

                "vk": false,

                "weibo": false,

            },
