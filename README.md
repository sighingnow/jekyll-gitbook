# BeOps: shipping AI that stays up. Evaluation, cost and reliability, from an SRE's notebook

A comprehensive documentation site covering DevOps best practices, Kubernetes, and Site Reliability Engineering (SRE) principles.

## 🚀 Features

- **DevOps Best Practices**: Practical guides and tutorials
- **Kubernetes Deep Dives**: From basics to advanced concepts
- **SRE Principles**: Site Reliability Engineering methodologies
- **Ingress Controllers**: Comprehensive coverage of Kubernetes networking
- **AI-Powered Content Generation**: Automated blog post creation using OpenAI and Google Gemini APIs
- **RAG over own posts**: Hybrid retrieval (pgvector + Postgres FTS + RRF) so the generator cites prior work and stops repeating itself — see [**docs/architecture.md**](docs/architecture.md) for diagrams of the pipeline.

## 📚 Content

This site is built with Jekyll and hosted on GitHub Pages. Visit the live site at: https://neverthesame.github.io/BeOps/

## 🏗️ Project Structure

```
BeOps/
├── _posts/              # Blog posts (Jekyll format)
├── _pages/              # Static pages
├── _layouts/            # Jekyll layouts
├── _includes/            # Jekyll includes
├── assets/              # Images and static assets
├── posts-generator/     # Python content generation tools
│   ├── py-feedparser.py      # Main content generation script
│   ├── title_generator.py     # AI-powered title generation
│   ├── youtube_processor.py   # YouTube content processing
│   ├── openai_worker_4o.py   # OpenAI API integration
│   ├── prompts.json           # AI prompts configuration
│   ├── configs/               # Configuration files
│   ├── produced_posts/        # Generated content output
│   └── logs/                  # Execution logs
├── configs/             # Project configuration files
├── AGENTS.md            # AI agent instructions (see below)
└── README.md            # This file
```

## 🛠️ Local Development

### Jekyll Site Setup

```bash
# Install Ruby dependencies
bundle install

# Start local development server with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

The site will be available at `http://localhost:4000`

### Python Content Generation Tools

The project includes AI-powered tools for generating blog content:

```bash
# Navigate to posts-generator directory
cd posts-generator

# Create and activate virtual environment
python -m venv py-feedparser
source py-feedparser/bin/activate  # On macOS/Linux
# or
py-feedparser\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt

# Generate new content
python py-feedparser.py --config config-4o.json
```

**Key Tools:**
- `py-feedparser.py`: Main content generation from RSS feeds and other sources
- `title_generator.py`: AI-powered title generation
- `youtube_processor.py`: Process YouTube videos into blog posts
- `openai_worker_4o.py`: OpenAI GPT-4o integration

**Configuration:**
- API keys should be stored in `.env` file (not in version control)
- Configuration files are in `posts-generator/configs/` directory
- Generated posts are saved to `posts-generator/produced_posts/`
- Logs are available in `posts-generator/logs/`

## 🧪 Testing

### Jekyll Site
```bash
# Test build locally
bundle exec jekyll build

# Check for broken links
bundle exec jekyll build --verbose
```

### Python Tools
```bash
cd posts-generator
python py-feedparser.py --test
python title_generator.py --test
python youtube_processor.py --test
```

## 📝 Contributing

We welcome contributions! Here's how you can help:

1. **Content Contributions**: Submit new blog posts or improve existing ones
2. **Bug Reports**: Report issues via GitHub Issues
3. **Feature Requests**: Suggest enhancements and new features
4. **Code Improvements**: Improve the content generation tools

### Adding New Content

1. Generate content using the Python tools (see above)
2. Review and edit generated content
3. Add to `_posts/` directory with format: `YYYY-MM-DD-title.md`
4. Follow Jekyll front matter conventions
5. Submit a pull request

### Code Style

- **Python**: Follow PEP 8 guidelines, use type hints, add docstrings
- **Markdown**: Use consistent front matter, follow Jekyll naming conventions
- **Commits**: Use descriptive commit messages

## 🔒 Security

- **API Keys**: Never commit API keys to the repository. Use `.env` files
- **Service Accounts**: Google service account files should not be in public repos
- **Sensitive Data**: Keep all sensitive configurations out of version control

## 🚀 Deployment

The site is automatically deployed to GitHub Pages on push to the main branch. The build process is handled by GitHub Actions.

**Deployment Workflow:**
1. Generate new content using Python tools
2. Review and edit generated content
3. Add to `_posts/` directory
4. Commit and push to trigger automatic rebuild

## 🤖 AI Agent Support

This project includes an `AGENTS.md` file that provides detailed instructions for AI coding agents working on this project. If you're using AI assistants like Cursor, GitHub Copilot, or similar tools, they will automatically reference `AGENTS.md` for project-specific guidance.

**For AI Agents**: See `AGENTS.md` for comprehensive setup instructions, code style guidelines, testing procedures, and workflow documentation.

## 📄 License

This project is licensed under the MIT License.