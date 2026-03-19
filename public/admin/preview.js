// Custom Preview for Decap CMS
// Decap CMS exposes h and createClass on the global scope
const BlogPreview = window.createClass({
    render: function () {
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title']);
        const body = this.props.widgetFor('body');
        const image = entry.getIn(['data', 'image']);
        const bgImage = image ? this.props.getAsset(image) : '';

        return h('div', { className: 'blog-post-preview-container' },
            h('div', { className: 'blog-hero-section', style: { padding: '40px 0', borderBottom: '1px solid #eee', marginBottom: '40px' } },
                h('div', { className: 'container v1 w-container', style: { maxWidth: '800px', margin: '0 auto' } },
                    h('h1', { className: 'blog-article-title' }, title),
                    bgImage && h('div', { className: 'blog-hero-image-wrap' },
                        h('img', {
                            src: bgImage.toString(),
                            className: 'blog-hero-image',
                            style: { width: '100%', borderRadius: '16px', marginBottom: '40px', objectFit: 'cover', maxHeight: '400px' }
                        })
                    )
                )
            ),
            h('article', { className: 'container v1 w-container', style: { maxWidth: '800px', margin: '0 auto' } },
                h('div', { className: 'blog-article-body' }, body)
            )
        );
    }
});

CMS.registerPreviewTemplate("blog", BlogPreview);

// Register Site Styles
CMS.registerPreviewStyle("/css/normalize.css");
CMS.registerPreviewStyle("/css/webflow.css");
CMS.registerPreviewStyle("/css/karols-stunning-site-350399.webflow.css");

// Register Custom Blog Preview Styles (mirroring [slug].astro)
CMS.registerPreviewStyle({
    toString: () => `
    .blog-post-preview-container {
      background: #fafaf9;
      min-height: 100vh;
      color: #1a1611;
      font-family: Inter, sans-serif;
    }
    .blog-article-title {
      font-size: 64px !important;
      font-weight: 700 !important;
      line-height: 1.1 !important;
      letter-spacing: -2px !important;
      color: #1a1611 !important;
      margin: 0 0 48px 0 !important;
      text-align: left;
    }
    .blog-article-body {
      font-size: 16px !important;
      line-height: 1.65 !important;
      color: #1a1a1a !important;
    }
    .blog-article-body h2 {
      font-size: 24px !important;
      font-weight: 700 !important;
      line-height: 1.3 !important;
      letter-spacing: -0.5px !important;
      color: #1a1611 !important;
      margin: 48px 0 16px 0 !important;
    }
    .blog-article-body h3 {
      font-size: 20px !important;
      font-weight: 700 !important;
      line-height: 1.3 !important;
      letter-spacing: -0.3px !important;
      margin: 32px 0 12px 0 !important;
      color: #1a1611 !important;
    }
    .blog-article-body blockquote {
      margin: 32px 0 !important;
      padding: 8px 0 8px 20px !important;
      border-left: 2px solid #ffbd59 !important;
      font-size: 16px !important;
      font-style: italic !important;
      line-height: 1.6 !important;
      color: #555 !important;
    }
    .blog-article-body p {
      margin: 0 0 24px 0 !important;
    }
    .blog-article-body strong {
      font-weight: 700 !important;
    }
    .blog-article-body ul, .blog-article-body ol {
      margin: 20px 0 28px 0 !important;
      padding-left: 20px !important;
    }
    .blog-article-body li {
      margin-bottom: 12px !important;
    }
  `
});
