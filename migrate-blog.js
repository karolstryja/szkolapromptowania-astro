const fs = require('fs');
const path = require('path');

// 1. Setup collections
fs.mkdirSync('src/content/blog', { recursive: true });
fs.mkdirSync('src/pages/blog', { recursive: true });
const configTs = `
import { defineCollection, z } from 'astro:content';
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    image: z.string().optional(),
    video: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});
export const collections = { 'blog': blogCollection };
`;
fs.writeFileSync('src/content/config.ts', configTs);

// 2. Move posts
const postsDir = 'blog/posts';
if (fs.existsSync(postsDir)) {
    for (const file of fs.readdirSync(postsDir)) {
        if (file.endsWith('.md')) {
            fs.copyFileSync(path.join(postsDir, file), path.join('src/content/blog', file));
        }
    }
}

// 3. Create blog/[slug].astro from blog.astro
let blogAstro = fs.readFileSync('src/pages/blog.astro', 'utf8');

const astroFrontmatter = `---
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;

let md = post.body || '';
var heroSrc = (post.data.image || '').replace(/^\\//, '');
var isHeroVideo = heroSrc.match(/\\.(mp4|webm|mov)$/i);

md = md.replace(/:::video\\n([\\s\\S]*?):::/g, function(match, content) {
    var src = content.trim().replace(/^\\//, '');
    if (isHeroVideo && src === heroSrc) return '';
    return '<div class="blog-video"><video src="/' + src + '" controls playsinline preload="metadata"></video></div>';
});

md = md.replace(/:::gallery-(masonry|grid|fullwidth|slider)\\n([\\s\\S]*?):::/g, function(match, layout, content) {
    var lines = content.trim().split('\\n');
    var count = lines.length;
    var figures = lines.map(function(line) {
        var pts = line.split('|');
        var src = pts[0].trim().replace(/^\\//, '');
        var caption = pts[1] ? pts[1].trim() : '';
        return '<figure><img src="/' + src + '" alt="' + caption + '" loading="lazy"></figure>';
    }).join('\\n');
    return '<div class="blog-gallery gallery-' + layout + '" data-count="' + count + '">' + figures + '</div>';
});

const htmlContent = marked.parse(md);

const title = post.data.title + ' — Szkoła Promptowania';
const tags = post.data.tags || [];

// determine hero media
const videoSrc = post.data.video ? '/' + post.data.video.replace(/^\\//, '') : '';
const imgSrc = post.data.image ? '/' + post.data.image.replace(/^\\//, '') : '';
const showVideo = !!videoSrc || !!(imgSrc && isHeroVideo);
const finalVideoSrc = videoSrc || (isHeroVideo ? imgSrc : '');
const showImage = !!imgSrc && !isHeroVideo && !videoSrc;
---
`;

blogAstro = astroFrontmatter + blogAstro;

// 3a. replace title
blogAstro = blogAstro.replace(/<title>.*?<\/title>/, '<title>{title}</title>');

// 3b. replace variables in HTML
blogAstro = blogAstro.replace(/<img id="blog-hero".*?>/g, '{showImage && <img class="blog-hero-image" src={imgSrc} />}');
blogAstro = blogAstro.replace(/<video id="blog-hero-video".*?><\/video>/g, '{showVideo && <video class="blog-hero-video" src={finalVideoSrc} poster={videoSrc ? imgSrc : ""} controls playsinline preload="metadata"></video>}');

blogAstro = blogAstro.replace(/<h1 id="blog-title" class="blog-article-title"><\/h1>/, '<h1 class="blog-article-title">{post.data.title}</h1>');
blogAstro = blogAstro.replace(/<div id="blog-meta-tags".*?>.*?<\/div>/, '<div class="blog-meta-tags">{tags.map(t => <span class="blog-meta-tag">{t}</span>)}</div>');
blogAstro = blogAstro.replace(/<div id="blog-content".*?>.*?<\/div>/, '<div class="blog-article-body" set:html={htmlContent}></div>');

// 3c. Strip the big client-side fetch code
// From <script>\n    (function() {\n      var params = new URLSearchParams
// We can just regex replace everything inside between <script src="https://cdn.jsdelivr.net/npm/marked..."></script> and the end body
blogAstro = blogAstro.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/dompurify.*?<\/script>/is, '');
blogAstro = blogAstro.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/marked.*?<\/script>/is, '');
blogAstro = blogAstro.replace(/<script>\s*\(function\(\) \{\s*var params = new URLSearchParams\([\s\S]*?var toggle = document\.getElementById\('theme-toggle'\);[\s\S]*?\}\(\);\s*<\/script>/is, `<script is:inline>
  function initScrollAnimations() {
    var els = document.querySelectorAll('.blog-article-body > *');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      els.forEach(function(el) { obs.observe(el); });
    } else {
      els.forEach(function(el) { el.classList.add('is-visible'); });
    }
  }

  function initReadingProgress() {
    var bar = document.getElementById('reading-progress');
    var article = document.querySelector('.blog-article');
    if (!bar || !article) return;
    window.addEventListener('scroll', function() {
      var top = article.offsetTop;
      var h = article.offsetHeight;
      var wh = window.innerHeight;
      var sy = window.scrollY || window.pageYOffset;
      var p = (sy - top + wh * 0.3) / (h - wh * 0.5);
      bar.style.width = (Math.min(Math.max(p, 0), 1) * 100) + '%';
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initReadingProgress();
    // Load footer
    fetch('/components/footer.html')
      .then(r => r.ok ? r.text() : '')
      .then(html => {
        var fc = document.getElementById('footer-component');
        if (fc && html) {
          fc.innerHTML = html;
        }
      });
  });
</script>`);

fs.writeFileSync('src/pages/blog/[slug].astro', blogAstro);

// 4. Update index links in index.astro
let indexAstro = fs.readFileSync('src/pages/index.astro', 'utf8');
indexAstro = indexAstro.replace(/href="\/blog\?post=([^"]+)"/g, 'href="/blog/$1"');
indexAstro = indexAstro.replace(/href="blog\.html\?post=([^"]+)"/g, 'href="/blog/$1"');
fs.writeFileSync('src/pages/index.astro', indexAstro);

console.log('Migration to SSG completed!');
