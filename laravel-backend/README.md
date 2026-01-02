# ADINAS Agriculture Digital Platform - Laravel Backend

A comprehensive Laravel-based API backend for the ADINAS Agriculture Digital Platform, designed to serve farmers, extension officers, agricultural suppliers, and administrators in Tanzania.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication with tymon/jwt-auth
- Role-based access control (Admin, Extension Officer, Farmer, Agri Dealer, Agri Company)
- User registration, login, password reset
- Email verification system

### 👥 User Management
- Comprehensive user profiles with agricultural information
- Multi-language support (English & Swahili)
- Regional data (Region, District, Ward)
- Profile image upload and management

### 📚 Agricultural Content Management
- Articles, guides, tips, news, videos, infographics
- Multi-language content support
- Category and tag-based organization
- Featured content system
- View tracking and analytics

### 🏪 Supplier & Product Management
- Supplier profile creation and verification
- Product catalog with images and specifications
- Stock management system
- Category-based product organization
- Review and rating system

### 💰 Market Price Tracking
- Real-time market price data
- Regional price variations
- Historical price trends
- Multiple market sources

### 🌤️ Weather Data Integration
- Location-based weather information
- Forecast data for farming decisions
- Weather alerts and notifications
- Farming advice based on conditions

### 👨‍🌾 Consultation System
- Farmer-Extension Officer consultations
- Scheduling and management
- Status tracking and completion
- Rating and feedback system

### 📊 Farm Record Management
- Crop production records
- Planting and harvest tracking
- Cost and revenue analysis
- Yield calculations

### 🔔 Notification System
- Real-time notifications
- Multiple notification types
- Priority-based alerts
- Read/unread status tracking

### 📈 Activity Logging
- Comprehensive user activity tracking
- System audit trails
- Performance analytics
- Security monitoring

## Technology Stack

- **Framework**: Laravel 10.x
- **Database**: MySQL
- **Authentication**: JWT (tymon/jwt-auth)
- **Permissions**: Spatie Laravel Permission
- **File Storage**: Laravel Storage (configurable)
- **API**: RESTful API with JSON responses

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL 5.7 or higher
- Node.js (for asset compilation, optional)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database and other configurations:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=adinas_agriculture
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   
   JWT_SECRET=your_jwt_secret
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Generate JWT secret**
   ```bash
   php artisan jwt:secret
   ```

6. **Run database migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed the database (optional)**
   ```bash
   php artisan db:seed
   ```

8. **Create storage link**
   ```bash
   php artisan storage:link
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000/api/v1`

## API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/v1/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+255123456789",
  "password": "password123",
  "password_confirmation": "password123",
  "user_type": "farmer",
  "region": "Arusha",
  "district": "Arusha Urban",
  "ward": "Kaloleni"
}
```

#### Login
```http
POST /api/v1/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/v1/me
Authorization: Bearer {jwt_token}
```

### Content Endpoints

#### Get All Content
```http
GET /api/v1/content?type=article&category=crop_production&language=en&page=1
```

#### Create Content
```http
POST /api/v1/content
Authorization: Bearer {jwt_token}
Content-Type: multipart/form-data

{
  "title": "Maize Farming Best Practices",
  "content": "Detailed content here...",
  "content_type": "article",
  "category": "crop_production",
  "language": "en",
  "tags": ["maize", "farming", "tips"]
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/v1/products?category=seeds&min_price=1000&max_price=50000&in_stock=true
```

#### Create Product
```http
POST /api/v1/products
Authorization: Bearer {jwt_token}
Content-Type: multipart/form-data

{
  "name": "Hybrid Maize Seeds",
  "description": "High-yield hybrid maize seeds",
  "category": "seeds",
  "price": 15000,
  "unit": "kg",
  "stock_quantity": 100
}
```

### Supplier Endpoints

#### Get All Suppliers
```http
GET /api/v1/suppliers?verified=true&region=Arusha&type=input_dealer
```

#### Create Supplier Profile
```http
POST /api/v1/suppliers
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "company_name": "Arusha Agri Supplies",
  "supplier_type": "input_dealer",
  "description": "Quality agricultural inputs",
  "address": "123 Market Street, Arusha",
  "region": "Arusha",
  "district": "Arusha Urban"
}
```

## Database Schema

### Key Tables
- `users` - User accounts and basic information
- `user_profiles` - Extended user profiles with agricultural data
- `suppliers` - Supplier business profiles
- `products` - Product catalog
- `agricultural_content` - Articles, guides, and educational content
- `market_prices` - Market price data
- `weather_data` - Weather information and forecasts
- `consultations` - Farmer-Extension Officer consultations
- `farm_records` - Farm production records
- `reviews` - Product and supplier reviews
- `notifications` - User notifications
- `activity_logs` - System activity tracking

## User Roles & Permissions

### Admin
- Full system access
- User management
- Content moderation
- Supplier verification
- System analytics

### Extension Officer
- Content creation and management
- Consultation management
- Farmer support
- Regional data access

### Farmer
- Profile management
- Farm record keeping
- Consultation requests
- Content consumption
- Product browsing

### Agri Dealer / Agri Company
- Supplier profile management
- Product catalog management
- Order management
- Customer communication

## File Storage

The system supports file uploads for:
- User profile images
- Product images
- Content attachments
- Document uploads

Files are stored using Laravel's storage system and can be configured for local or cloud storage (S3, etc.).

## Localization

The system supports multiple languages:
- English (en)
- Swahili (sw)

Content can be created in either language or marked as bilingual.

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting (configurable)
- Activity logging for audit trails

## Performance Considerations

- Database indexing on frequently queried fields
- Eager loading to prevent N+1 queries
- Pagination for large datasets
- Image optimization for uploads
- Caching for frequently accessed data

## Development

### Code Structure
```
app/
├── Http/
│   ├── Controllers/Api/     # API Controllers
│   └── Middleware/          # Custom Middleware
├── Models/                  # Eloquent Models
└── ...

database/
├── migrations/              # Database Migrations
└── seeders/                # Database Seeders

routes/
└── api.php                 # API Routes
```

### Testing
```bash
# Run tests
php artisan test

# Run specific test
php artisan test --filter UserTest
```

### Code Quality
```bash
# Run PHP CS Fixer
./vendor/bin/pint

# Run PHPStan
./vendor/bin/phpstan analyse
```

## Deployment

### Production Setup
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure proper database credentials
4. Set up SSL certificates
5. Configure web server (Apache/Nginx)
6. Set up queue workers for background jobs
7. Configure cron jobs for scheduled tasks

### Environment Variables
Key environment variables for production:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=your_db_host
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

JWT_SECRET=your_production_jwt_secret
```

## API Rate Limiting

The API includes rate limiting to prevent abuse:
- 60 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users
- Higher limits for premium users (configurable)

## Monitoring & Logging

- Application logs in `storage/logs/`
- Activity logs in database
- Error tracking and reporting
- Performance monitoring
- API usage analytics

## Support

For technical support or questions:
- Email: support@adinas.co.tz
- Documentation: [API Docs URL]
- Issue Tracker: [GitHub Issues URL]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Changelog

### Version 1.0.0
- Initial release
- Complete API implementation
- User management system
- Content management
- Supplier and product management
- Consultation system
- Farm record management
- Multi-language support