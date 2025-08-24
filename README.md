# Organic-Hub Project Structure

## 🏗️ Reorganized Project Architecture

This document outlines the new, professional folder structure for the Organic-Hub e-commerce platform.

## 📁 Frontend Structure (`Organic-Hub---frontend/`)

```
src/
├── features/                    # Feature-based organization
│   ├── auth/                   # Authentication & Authorization
│   │   ├── components/         # Auth-related UI components
│   │   ├── hooks/             # Auth-related custom hooks
│   │   ├── services/          # Auth API services
│   │   ├── context/           # Auth context providers
│   │   └── pages/             # Auth pages (Login, Signup, etc.)
│   ├── products/              # Product management
│   │   ├── components/        # Product UI components
│   │   ├── hooks/            # Product-related hooks
│   │   ├── services/         # Product API services
│   │   ├── store/            # Product Redux slices
│   │   └── pages/            # Product pages
│   ├── cart/                  # Shopping cart functionality
│   │   ├── components/        # Cart UI components
│   │   ├── hooks/            # Cart-related hooks
│   │   ├── services/         # Cart API services
│   │   ├── store/            # Cart Redux slices
│   │   └── pages/            # Cart pages
│   ├── orders/                # Order management
│   │   ├── components/        # Order UI components
│   │   ├── hooks/            # Order-related hooks
│   │   ├── services/         # Order API services
│   │   ├── store/            # Order Redux slices
│   │   └── pages/            # Order pages
│   ├── admin/                 # Admin dashboard
│   │   ├── components/        # Admin UI components
│   │   ├── services/         # Admin API services
│   │   └── pages/            # Admin pages
│   ├── seasonal/              # Seasonal products
│   │   ├── components/        # Seasonal UI components
│   │   ├── hooks/            # Seasonal hooks
│   │   ├── services/         # Seasonal API services
│   │   ├── store/            # Seasonal Redux slices
│   │   └── pages/            # Seasonal pages
│   ├── user/                  # User profile & settings
│   │   ├── components/        # User UI components
│   │   └── pages/            # User pages
│   ├── home/                  # Home page
│   │   └── pages/            # Home page components
│   ├── checkout/              # Checkout process
│   │   └── pages/            # Checkout pages
│   ├── payment/               # Payment processing
│   │   └── pages/            # Payment pages
│   └── wishlist/              # User wishlist
│       └── pages/            # Wishlist pages
├── shared/                    # Shared components & utilities
│   ├── components/            # Reusable UI components
│   ├── hooks/                # Shared custom hooks
│   ├── utils/                # Utility functions
│   └── constants/            # App constants
├── core/                      # Core application logic
│   ├── store/                # Redux store configuration
│   ├── services/             # Core services
│   ├── context/              # Core context providers
│   └── routes/               # Routing configuration
├── assets/                    # Static assets
│   ├── icons/                # SVG icons
│   └── images/               # Images & placeholders
└── styles/                    # Global styles
    ├── globals.css           # Global CSS
    ├── components.css        # Component styles
    ├── organic-theme.css     # Theme variables
    └── responsive.css        # Responsive utilities
```

## 📁 Backend Structure (`Organic-Hub--Backend/`)

```
src/
├── modules/                   # Feature-based modules
│   ├── auth/                 # Authentication module
│   │   ├── controllers/      # Auth controllers
│   │   ├── models/          # Auth models
│   │   ├── routes/          # Auth routes
│   │   └── services/        # Auth services
│   ├── products/             # Product module
│   │   ├── controllers/      # Product controllers
│   │   ├── models/          # Product models
│   │   ├── routes/          # Product routes
│   │   └── services/        # Product services
│   ├── orders/               # Order module
│   │   ├── controllers/      # Order controllers
│   │   ├── models/          # Order models
│   │   ├── routes/          # Order routes
│   │   └── services/        # Order services
│   ├── payments/             # Payment module
│   │   ├── controllers/      # Payment controllers
│   │   ├── models/          # Payment models
│   │   ├── routes/          # Payment routes
│   │   └── services/        # Payment services
│   ├── admin/                # Admin module
│   │   ├── controllers/      # Admin controllers
│   │   ├── models/          # Admin models
│   │   ├── routes/          # Admin routes
│   │   └── services/        # Admin services
│   ├── seasonal/             # Seasonal module
│   │   ├── controllers/      # Seasonal controllers
│   │   │   ├── models/      # Seasonal models
│   │   │   ├── routes/      # Seasonal routes
│   │   │   └── services/    # Seasonal services
│   └── users/                # User module
│       ├── controllers/      # User controllers
│       ├── models/          # User models
│       ├── routes/          # User routes
│       └── services/        # User services
├── shared/                    # Shared utilities
│   ├── middleware/           # Express middleware
│   ├── utils/                # Utility functions
│   └── constants/            # App constants
├── core/                     # Core application
│   ├── config/               # Configuration files
│   ├── database/             # Database configuration
│   └── app/                  # Main app files
│       ├── app.js            # Express app setup
│       ├── index.js          # Server entry point
│       └── start.js          # Server startup script
├── seeds/                     # Database seeders
└── tests/                     # Test files
```

## 🧹 Cleaned Up Files

### ❌ Removed Files:
- `test-auth.js` - Test file (moved to proper test directory)
- `test-payment.js` - Test file (moved to proper test directory)
- `test-razorpay-config.js` - Test file (moved to proper test directory)
- `test-backend.js` - Test file (moved to proper test directory)
- `test-razorpay.js` - Test file (moved to proper test directory)
- `setup-razorpay.js` - Setup script (moved to scripts directory)

### 📁 Reorganized Files:
- `RAZORPAY_SETUP.md` → `docs/razorpay-setup.md`
- `RAZORPAY_SETUP.md` (backend) → `docs/razorpay-backend-setup.md`

## 🚀 Benefits of New Structure

1. **Feature-Based Organization**: Related code is grouped together
2. **Scalability**: Easy to add new features without cluttering
3. **Maintainability**: Clear separation of concerns
4. **Team Collaboration**: Multiple developers can work on different features
5. **Code Reusability**: Shared components and utilities are clearly separated
6. **Testing**: Better organization for unit and integration tests
7. **Import Paths**: Cleaner, more intuitive import statements

## 📝 Next Steps

1. **Update Import Paths**: All import statements need to be updated to reflect new structure
2. **Create Index Files**: Add index.js files for cleaner imports
3. **Update Documentation**: Update README files and API documentation
4. **Test Everything**: Ensure all functionality works with new structure
5. **Update CI/CD**: Modify deployment scripts if needed

## 🔧 Migration Notes

- All existing functionality remains intact
- Only file locations have changed
- Import paths need to be updated throughout the codebase
- Consider using path aliases for cleaner imports
- Test thoroughly after migration
