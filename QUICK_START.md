# ⚡ Quick Start Guide

## 🚀 Get Your Store Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

Open PowerShell in `e:\hydrogen\store1` and run:

```powershell
npm install
```

### Step 2: Set Up Environment (1 minute)

1. Copy the environment template:

```powershell
copy .env.example .env
```

2. Open `.env` in VS Code and fill in your Shopify credentials:
   - Get Storefront tokens from: **Shopify Admin → Sales Channels → Hydrogen**
   - Get Admin token from: **Shopify Admin → Settings → Apps → Develop apps**
   - Generate session secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Set Up Metafields (1 minute)

```powershell
npm run setup:metafields
```

This creates custom fields for products, collections, and shop settings.

### Step 4: Generate Types (1 minute)

```powershell
npm run codegen
```

This generates TypeScript types from your Shopify store's GraphQL schema.

### Step 5: Start Development Server

```powershell
npm run dev
```

**Your store is now running at: http://localhost:3000** 🎉

---

## 📋 Required Shopify Setup

### Before You Start, You Need:

1. **Shopify Store** (Partner or paid plan)
2. **Hydrogen Sales Channel** installed
3. **Admin API Access** enabled

### Get Your Tokens:

#### Storefront API Tokens

1. Go to **Shopify Admin → Sales Channels → Hydrogen**
2. Create a new storefront or select existing
3. Copy **Storefront ID** and **API tokens**

#### Admin API Token

1. Go to **Shopify Admin → Settings → Apps and sales channels**
2. Click **Develop apps**
3. Create new app or select existing
4. Configure Admin API scopes:
   - `read_products`
   - `write_products`
   - `read_collections`
   - `write_collections`
   - `read_orders`
   - `write_metafields`
5. Install app and copy **Admin API access token**

---

## 🎯 First Time Setup Checklist

```
✅ Step 1: Install dependencies
✅ Step 2: Configure .env file
✅ Step 3: Run metafield setup
✅ Step 4: Generate GraphQL types
✅ Step 5: Start dev server
⬜ Step 6: Add products in Shopify admin
⬜ Step 7: Tag products with "featured"
⬜ Step 8: Create collections
⬜ Step 9: Set metafields in Shopify admin
⬜ Step 10: Test the store
```

---

## 🔧 Common Commands

```powershell
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run typecheck        # Check TypeScript types

# GraphQL
npm run codegen          # Generate types from Shopify schema

# Setup
npm run setup:metafields # Create custom metafield definitions
```

---

## 🎨 Quick Customization

### Change Store Name

Edit `app/components/Layout/Header.tsx` line 26:

```tsx
RetailStore  →  Your Store Name
```

### Change Primary Color

Edit `tailwind.config.ts` lines 7-13:

```typescript
primary: {
  600: '#0284c7',  // Change this hex code
}
```

### Update Hero Banner

Edit `app/routes/_index.tsx` lines 47-52:

```typescript
const bannerData = {
  title: "Your Title",
  subtitle: "Your Subtitle",
  // ...
};
```

---

## ❌ Troubleshooting

### "Cannot find module" errors?

**Solution**: Run `npm install`

### TypeScript errors everywhere?

**Solution**: Run `npm run codegen` after setting up .env

### Admin login not working?

**Solution**: Check `ADMIN_PASSWORD` in .env file

### Metafields not showing?

**Solution**:

1. Run `npm run setup:metafields`
2. Set metafield values in Shopify admin
3. Run `npm run codegen` to refresh types

### Store not loading?

**Solution**: Check all environment variables are set correctly in .env

---

## 📚 Learn More

- **Full Documentation**: `README.md`
- **Project Summary**: `PROJECT_SUMMARY.md`
- **Hydrogen Guide**: Original `copilot-guide.md`

---

## 🆘 Need Help?

1. Check `README.md` for detailed instructions
2. Review TypeScript errors - they often indicate missing setup steps
3. Verify all environment variables are correct
4. Ensure Shopify store has required API access

---

**Ready to build something amazing! 🚀**
