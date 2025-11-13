# Hydrogen Retail Store - Shopify eCommerce Platform

A modern, headless eCommerce platform built with Shopify Hydrogen, Remix, and React. Features a complete storefront and admin panel for managing a retail clothing brand.

## 🚀 Features

### Storefront

- **Home Page** with featured products, collections, hero banner, and price filters
- **Product Pages** with image galleries, variant selection, and add-to-cart
- **Collection Pages** with sorting and filtering
- **Shopping Cart** with quantity management and checkout
- **Responsive Design** optimized for mobile, tablet, and desktop
- **SEO Optimized** with meta tags and structured data

### Admin Panel

- **Dashboard** with statistics and quick actions
- **Product Management** (coming soon)
- **Collection Management** (coming soon)
- **Order Management** (coming soon)
- **Secure Authentication** with password protection

### Technical Features

- Built with **Shopify Hydrogen 2024.10**
- **Remix** for routing and server-side rendering
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **GraphQL Code Generation** for type-safe API queries
- **Metafield Management** for custom data

## 📋 Prerequisites

- Node.js 18+ installed
- A Shopify store with:
  - Hydrogen sales channel installed
  - Admin API access
  - Storefront API tokens

## 🛠️ Installation

### 1. Clone and Install Dependencies

```powershell
cd e:\hydrogen\store1
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```powershell
cp .env.example .env
```

Edit `.env` and add your Shopify credentials:

```env
# Store Domain (e.g., mystore.myshopify.com)
PUBLIC_STORE_DOMAIN=your-store.myshopify.com

# Storefront ID (from Hydrogen channel)
PUBLIC_STOREFRONT_ID=your-storefront-id

# Storefront API Tokens (from Hydrogen channel settings)
PUBLIC_STOREFRONT_API_TOKEN=your-public-token
PRIVATE_STOREFRONT_API_TOKEN=your-private-token

# Admin API Token (from Settings > Apps > Develop apps)
ADMIN_API_ACCESS_TOKEN=your-admin-token

# Session Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
SESSION_SECRET=your-random-secret-key

# Admin Password (set a secure password)
ADMIN_PASSWORD=your-admin-password
```

### 3. Set Up Metafields

Run the metafield setup script to create custom fields in your Shopify store:

```powershell
npm run setup:metafields
```

This creates metafields for:

- **Products**: `is_featured`, `sale_percentage`, `care_instructions`
- **Collections**: `is_featured`, `display_order`
- **Shop**: `contact_email`, `store_location`, `store_phone`

### 4. Generate GraphQL Types

```powershell
npm run codegen
```

## 🚀 Development

Start the development server:

```powershell
npm run dev
```

The app will be available at `http://localhost:3000`

### Project Structure

```
e:\hydrogen\store1\
├── app/
│   ├── components/          # React components
│   │   ├── Admin/          # Admin panel components
│   │   ├── Layout/         # Header, Footer, CartDrawer
│   │   ├── Product/        # Product-related components
│   │   └── Storefront/     # Storefront feature components
│   ├── routes/             # Remix routes (file-based routing)
│   │   ├── _index.tsx      # Home page
│   │   ├── products.$handle.tsx    # Product detail page
│   │   ├── collections.$handle.tsx # Collection page
│   │   ├── cart.tsx        # Shopping cart
│   │   └── admin/          # Admin routes
│   ├── graphql/            # GraphQL queries
│   │   ├── storefront/     # Storefront API queries
│   │   └── admin/          # Admin API queries
│   ├── lib/                # Utility functions
│   │   ├── config.server.ts    # Environment config
│   │   ├── auth.server.ts      # Admin authentication
│   │   └── session.server.ts   # Session management
│   ├── styles/             # CSS files
│   ├── generated/          # Auto-generated GraphQL types
│   ├── root.tsx            # App root component
│   ├── entry.client.tsx    # Client entry point
│   └── entry.server.tsx    # Server entry point
├── scripts/
│   └── setupMetafields.ts  # Metafield setup script
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 📦 Key Components

### Storefront Components

- **`ProductCard`**: Displays product with image, title, price, and sale badge
- **`ProductGallery`**: Image gallery with thumbnails
- **`VariantSelector`**: Product variant selector (size, color, etc.)
- **`AddToCart`**: Add-to-cart button with quantity selector
- **`Header`**: Navigation with cart icon
- **`Footer`**: Footer with links and newsletter signup
- **`CartDrawer`**: Sliding cart drawer
- **`FeaturedProducts`**: Grid of featured products
- **`FeaturedCollections`**: Grid of featured collections
- **`HeroBanner`**: Hero banner with image and CTA
- **`PriceFilterCTA`**: Price filter cards
- **`ContactSection`**: Contact form and information

### Admin Components

- **`AdminLayout`**: Admin panel layout with sidebar
- **`AdminLogin`**: Admin login page

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with a custom theme. Primary color is configured in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
}
```

### GraphQL Codegen

GraphQL types are auto-generated from your Shopify store's schema. Run:

```powershell
npm run codegen
```

Types are generated in `app/generated/`:

- `storefront.generated.d.ts` - Storefront API types
- `admin.generated.d.ts` - Admin API types

## 🚀 Deployment

### Deploy to Shopify Oxygen

1. Install Shopify CLI:

```powershell
npm install -g @shopify/cli @shopify/cli-hydrogen
```

2. Link your app to Oxygen:

```powershell
shopify hydrogen link
```

3. Deploy:

```powershell
shopify hydrogen deploy
```

### Environment Variables for Production

Ensure all environment variables are set in your Oxygen deployment:

- `PUBLIC_STORE_DOMAIN`
- `PUBLIC_STOREFRONT_ID`
- `PUBLIC_STOREFRONT_API_TOKEN`
- `PRIVATE_STOREFRONT_API_TOKEN`
- `ADMIN_API_ACCESS_TOKEN`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

## 📝 Admin Panel Access

Access the admin panel at `/admin/login`

Default login uses the password set in `ADMIN_PASSWORD` environment variable.

## 🎨 Customization

### Update Branding

1. **Logo**: Update brand name in `app/components/Layout/Header.tsx`
2. **Colors**: Modify `tailwind.config.ts` for color scheme
3. **Hero Banner**: Update banner data in `app/routes/_index.tsx`

### Add Custom Metafields

1. Add metafield definition to `scripts/setupMetafields.ts`
2. Run `npm run setup:metafields`
3. Update GraphQL queries to fetch the new metafield
4. Update components to display the metafield data

## 🧪 Testing

```powershell
npm run typecheck    # Type checking with TypeScript
npm test             # Run tests (Vitest)
```

## 📚 Documentation

- [Shopify Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Remix Documentation](https://remix.run/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 🆘 Troubleshooting

### Common Issues

**Issue**: "Cannot find module '@shopify/remix-oxygen'"

- **Solution**: Run `npm install`

**Issue**: TypeScript errors in components

- **Solution**: Run `npm run codegen` to generate types from your Shopify store

**Issue**: "Unauthorized" when accessing admin

- **Solution**: Check that `ADMIN_PASSWORD` is set in `.env`

**Issue**: Metafields not appearing

- **Solution**: Run `npm run setup:metafields` and ensure Admin API token has correct permissions

### Getting Help

- Check the [Shopify Community Forums](https://community.shopify.com/)
- Review [Hydrogen GitHub Discussions](https://github.com/Shopify/hydrogen/discussions)
- Contact Shopify Partner Support

## 🎯 Next Steps

1. **Customize Design**: Update colors, fonts, and layouts
2. **Add More Products**: Populate your store with products and collections
3. **Set Up Payment**: Configure payment providers in Shopify admin
4. **Configure Shipping**: Set up shipping rates and zones
5. **Launch**: Deploy to Oxygen and go live!

---

**Built with ❤️ using Shopify Hydrogen**
