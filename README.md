# Air Traffic Expert Consulting Website

Professional Next.js website with integrated Netlify CMS for blog management.

## 🚀 QUICK START

### 1. PUSH TO GITHUB

```bash
cd airtrafficexpert-nextjs
git init
git add .
git commit -m "Initial commit: Next.js site with 5 blog posts"
git branch -M main
git remote add origin https://github.com/willmac1wm/airtrafficexpert-site.git
git push -u origin main
```

### 2. DEPLOY TO NETLIFY

1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"**
4. Select: **airtrafficexpert-site**
5. Build settings (should auto-fill):
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
6. Click **"Deploy site"**
7. Wait 3-5 minutes for build

### 3. ENABLE NETLIFY CMS (ADMIN)

After successful deployment:

1. In Netlify dashboard → **"Site settings"**
2. Click **"Identity"** in left sidebar
3. Click **"Enable Identity"**
4. Under **"Registration preferences"** → Select **"Invite only"**
5. Under **"Services"** → Click **"Enable Git Gateway"**
6. Go to **"Identity"** tab → Click **"Invite users"**
7. Enter your email address
8. Check your email and accept invite
9. Set your password

### 4. ACCESS YOUR ADMIN

Visit: `https://your-site-name.netlify.app/admin`

Login with your email and password.

Now you can:
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Upload images
- ✅ Publish/unpublish content
- ✅ Everything saves to your GitHub repo

## 📁 PROJECT STRUCTURE

```
airtrafficexpert-nextjs/
├── pages/
│   ├── index.js          # Home page
│   ├── services.js       # Services page
│   ├── about.js          # About page
│   ├── contact.js        # Contact page
│   └── blog/
│       ├── index.js      # Blog listing
│       └── [slug].js     # Individual blog posts
├── components/
│   └── Layout.js         # Header + Footer
├── content/
│   └── posts/            # Blog posts (5 included)
│       ├── atc-staffing-crisis-2025.md
│       ├── effective-air-traffic-controller.md
│       ├── future-atc-technology.md
│       ├── controller-retention-crisis.md
│       └── becoming-air-traffic-controller.md
├── lib/
│   └── posts.js          # Blog functionality
├── public/
│   ├── admin/            # Netlify CMS
│   └── images/           # Your images
├── styles/
│   └── globals.css       # All styles
└── package.json
```

## ✨ FEATURES

### Included Pages
- ✅ Home page with hero section
- ✅ Services page with detailed offerings
- ✅ About page with your background
- ✅ Contact page with Netlify form
- ✅ Blog index with all posts
- ✅ Individual blog post pages

### Blog System
- ✅ 5 pre-written blog posts about ATC topics
- ✅ Markdown-based content
- ✅ CMS admin at `/admin`
- ✅ Image upload support
- ✅ Tags and categories
- ✅ SEO-friendly URLs

### Contact Form
- ✅ Netlify Forms integration
- ✅ Spam protection
- ✅ Email notifications
- ✅ Service selection dropdown

## 📝 INCLUDED BLOG POSTS

1. **The Real Crisis in Air Traffic Control** (Nov 15, 2025)
   - ATC staffing shortage analysis
   - Compensation issues
   - Policy recommendations

2. **What Makes an Effective Air Traffic Controller** (Nov 10, 2025)
   - Essential skills and qualities
   - Training insights
   - Professional development

3. **The Future of ATC Technology** (Nov 5, 2025)
   - Emerging technologies
   - AI and automation
   - Remote tower operations

4. **Why Controllers Are Leaving** (Nov 1, 2025)
   - Retention crisis analysis
   - Work-life balance challenges
   - Compensation reform needs

5. **So You Want to Be an Air Traffic Controller** (Oct 28, 2025)
   - Career guide for aspiring controllers
   - Training requirements
   - Realistic expectations

## 🎨 CUSTOMIZATION

### Update Contact Information

Edit `components/Layout.js` (lines 38-42):

```javascript
<ul>
  <li>Email: YOUR-EMAIL@example.com</li>
  <li>Phone: YOUR-PHONE-NUMBER</li>
</ul>
```

### Add Your Logo

1. Add your logo image to `/public/images/logo.png`
2. Edit `components/Layout.js` (line 15)

### Change Colors

Edit `styles/globals.css` (lines 4-9):

```css
:root {
  --primary-color: #1e40af;    /* Main blue */
  --secondary-color: #0ea5e9;  /* Light blue */
  --accent-color: #f59e0b;     /* Orange */
}
```

## 📧 CONTACT FORM SETUP

### Enable Email Notifications

1. In Netlify → Your site → **"Forms"**
2. Click **"Settings and notifications"**
3. Click **"Add notification"** → **"Email notification"**
4. Enter your email address
5. Select form: **"contact"**
6. Save

Now you'll receive emails when someone submits the form!

## ✍️ WRITING NEW BLOG POSTS

### Option 1: Use the CMS (Recommended)

1. Go to `your-site.netlify.app/admin`
2. Click **"New Posts"**
3. Fill in:
   - Title
   - Date
   - Excerpt (summary)
   - Featured image (optional)
   - Tags
   - Body content (Markdown)
4. Click **"Publish"**
5. Netlify automatically rebuilds your site

### Option 2: Manual (Advanced)

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-11-17"
excerpt: "Brief summary of your post"
image: "/images/blog/your-image.jpg"
author: "Will Macomber"
tags: ["tag1", "tag2"]
---

Your content here in Markdown format...
```

## 🔧 LOCAL DEVELOPMENT

### Install Dependencies

```bash
cd airtrafficexpert-nextjs
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run export
```

Output in `out/` directory.

## 🌐 CUSTOM DOMAIN

### Add Your Domain

1. In Netlify → **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain: `airtrafficexpert.com`
4. Follow DNS instructions
5. Enable HTTPS (automatic)

## 📱 WHAT'S WORKING

✅ **All Pages**: Home, Services, About, Contact, Blog
✅ **Blog Posts**: 5 posts included and ready
✅ **CMS**: WordPress-style admin at `/admin`
✅ **Forms**: Contact form with Netlify integration
✅ **Mobile Responsive**: Works on all devices
✅ **SEO Friendly**: Meta tags, semantic HTML
✅ **Fast Loading**: Optimized Next.js build

## 🆘 TROUBLESHOOTING

### Build Fails

Check build logs in Netlify. Common issues:
- Missing dependencies → Fixed in `package.json`
- Node version → Netlify uses current LTS
- Missing files → All required files included

### CMS Not Loading

- Make sure Netlify Identity is enabled
- Make sure Git Gateway is enabled
- Check that you've accepted the invite email
- Clear browser cache

### Contact Form Not Working

- Forms only work after deployment
- Enable email notifications in Netlify
- Check spam folder for submissions

## 📚 LEARN MORE

- **Next.js Documentation**: https://nextjs.org/docs
- **Netlify CMS**: https://www.netlifycms.org/docs
- **Netlify Forms**: https://docs.netlify.com/forms/setup

## 🎯 NEXT STEPS

1. ✅ Push to GitHub (done above)
2. ✅ Deploy to Netlify (done above)
3. ✅ Enable Netlify Identity (do this next)
4. ✅ Enable Git Gateway (do this next)
5. ✅ Invite yourself as admin
6. ✅ Login to `/admin`
7. ✅ Start writing more blog posts!

## 💡 TIPS

- Write blog posts in the CMS for automatic deployment
- Use high-quality images (1200x630px recommended)
- Write compelling excerpts for better engagement
- Use tags to organize your content
- Check mobile view before publishing

---

**Built with Next.js + Netlify CMS**

**Questions?** Contact: willmac1.wm@gmail.com
