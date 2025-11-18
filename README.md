# VERO - AI-Powered Real-Time Chat Application

## 🌟 Overview

VERO is a sophisticated real-time chat application that combines secure messaging with AI-powered conversation analysis. Built with a modern hybrid architecture, VERO leverages the strengths of both PostgreSQL and MongoDB to deliver optimal performance, scalability, and intelligent features.

## ✨ Features

### 💬 Real-Time Chat

- **Instant Messaging** with WebSocket connections
- **Online/Offline Status** indicators
- **Typing Indicators** for enhanced user experience
- **Message Read Receipts** and delivery status
- **Conversation History** with smart pagination
- **Private Chat Rooms** between users
- **Message Search** across all conversations
- **Multiple Message Types** (text, image, file, system)

### 🔐 Security & Authentication

- **JWT-based Authentication** with secure token management
- **Password Hashing** using bcryptjs (salt rounds: 10)
- **Password Reset** with secure email tokens
- **Role-based Authorization** middleware
- **Session Management** with online/offline tracking
- **Input Validation** with Joi schemas

### 🤖 AI-Powered Insights

- **Conversation Summarization** using OpenAI GPT
- **Sentiment Analysis** (Positive/Negative/Neutral)
- **Automated Insights Generation**
- **Searchable Conversation History**
- **Real-time AI Updates**
- **Sentiment Trends** and analytics

### 📱 User Experience

- **Responsive Design** for all devices
- **Real-time Notifications**
- **Unread Message Counts**
- **Conversation List** with last message preview
- **User Search** and discovery
- **Message Deletion** and management

## 🏗️ Architecture

VERO employs a sophisticated hybrid database architecture:

### Database Strategy

- **PostgreSQL**: User authentication, profiles, and relationships (structured data)
- **MongoDB**: Messages, chat history, and AI insights (unstructured, scalable data)

### Technology Stack

| Layer                 | Technology                | Purpose                    |
| --------------------- | ------------------------- | -------------------------- |
| **Backend Framework** | Node.js + Express.js      | REST API server            |
| **Real-time**         | Socket.io                 | WebSocket connections      |
| **SQL Database**      | PostgreSQL + Prisma ORM   | User data & authentication |
| **NoSQL Database**    | MongoDB + Mongoose ODM    | Messages & insights        |
| **Authentication**    | JWT + bcryptjs            | Secure auth                |
| **AI Integration**    | OpenAI API                | Conversation analysis      |
| **Email Service**     | Nodemailer                | Password reset             |
| **Validation**        | Joi                       | Request validation         |
| **Security**          | Helmet, CORS, Compression | Security headers           |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- MongoDB 6+
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone  https://github.com/abdallah4321/VERO-Modern-Scalable-Backend-API.git
   cd vero-chat-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:

   ```env
   # Server
   PORT=5000
   NODE_ENV=development

   # Databases
   MONGO_URI=mongodb://localhost:27017/vero_chat
   DATABASE_URL="postgresql://username:password@localhost:5432/vero_users"

   # Security
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # Email
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_app_password

   # AI Services
   OPENAI_API_KEY=your_openai_api_key_here

   # Frontend
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**

   ```bash
   # Setup PostgreSQL tables
   npx prisma generate
   npx prisma migrate dev --name init

   # MongoDB will create collections automatically
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
vero-chat-app/
├── prisma/                 # PostgreSQL schema and migrations
│   └── schema.prisma
├── src/
│   ├── Config/            # Database configurations
│   │   ├── mongoDB.js
│   │   └── sqlDB.js
│   ├── Controllers/       # Route controllers
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── insights.js
│   ├── Databases/         # Data access layers
│   │   ├── AuthDatabases.js
│   │   ├── ChatDatabases.js
│   │   └── InsightsDatabases.js
│   ├── Middleware/        # Custom middleware
│   │   ├── AuthMiddleware.js
│   │   └── ErrorHandler.js
│   ├── Models/           # MongoDB schemas
│   │   ├── MessageModels.js
│   │   └── InsightModels.js
│   ├── Routes/           # API route definitions
│   │   ├── Auth.js
│   │   ├── Chat.js
│   │   ├── Insights.js
│   │   └── Index.js
│   ├── Services/         # Business logic
│   │   ├── AuthServices.js
│   │   ├── ChatServices.js
│   │   ├── InsightsServices.js
│   │   └── SocketService.js
│   ├── Utils/            # Helpers and utilities
│   │   ├── APIError.js
│   │   ├── Jwt.js
│   │   ├── Nodemailer.js
│   │   └── Validators.js
│   ├── app.js           # Express app configuration
│   └── server.js        # Server entry point
├── .env                 # Environment variables
└── package.json
```

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint                       | Description               | Authentication |
| ------ | ------------------------------ | ------------------------- | -------------- |
| `POST` | `/api/v1/auth/register`        | Register new user         | Public         |
| `POST` | `/api/v1/auth/login`           | User login                | Public         |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset    | Public         |
| `POST` | `/api/v1/auth/reset-password`  | Reset password with token | Public         |
| `POST` | `/api/v1/auth/logout`          | User logout               | Protected      |

### Chat Endpoints

| Method   | Endpoint                               | Description                    | Authentication |
| -------- | -------------------------------------- | ------------------------------ | -------------- |
| `GET`    | `/api/v1/chat/users`                   | Get all users (except current) | Protected      |
| `GET`    | `/api/v1/chat/conversations`           | Get user conversations         | Protected      |
| `GET`    | `/api/v1/chat/messages/:receiverId`    | Get messages with user         | Protected      |
| `POST`   | `/api/v1/chat/messages/send`           | Send new message               | Protected      |
| `POST`   | `/api/v1/chat/conversations/mark-read` | Mark conversation as read      | Protected      |
| `GET`    | `/api/v1/chat/unread-counts`           | Get unread message counts      | Protected      |
| `DELETE` | `/api/v1/chat/messages/:messageId`     | Delete message                 | Protected      |
| `GET`    | `/api/v1/chat/search`                  | Search messages                | Protected      |

### Insights Endpoints

| Method | Endpoint                                        | Description               | Authentication |
| ------ | ----------------------------------------------- | ------------------------- | -------------- |
| `POST` | `/api/v1/insights/generate`                     | Generate AI summary       | Protected      |
| `GET`  | `/api/v1/insights/conversation/:conversationId` | Get conversation insights | Protected      |
| `GET`  | `/api/v1/insights/all`                          | Get all user insights     | Protected      |

### WebSocket Events

| Event                 | Direction       | Description               |
| --------------------- | --------------- | ------------------------- |
| `join`                | Client → Server | Join user room            |
| `send_message`        | Client → Server | Send new message          |
| `new_message`         | Server → Client | Receive new message       |
| `message_sent`        | Server → Client | Message sent confirmation |
| `typing_start`        | Client → Server | Start typing indicator    |
| `typing_stop`         | Client → Server | Stop typing indicator     |
| `user_typing`         | Server → Client | User typing status        |
| `user_status_changed` | Server → Client | User online status update |

## 🗄️ Database Models

### PostgreSQL Models

```prisma
model User {
  id                 Int      @id @default(autoincrement())
  name               String
  email              String   @unique
  password_hash      String
  created_at         DateTime @default(now())
  is_online          Boolean  @default(false)
  last_seen          DateTime?
  reset_token        String?
  reset_token_expiry DateTime?
}
```

### MongoDB Models

```javascript
// Message Model
Message {
  sender_id: Number,      // References PostgreSQL User ID
  receiver_id: Number,    // References PostgreSQL User ID
  text: String,
  conversation_id: String,
  message_type: String,   // 'text', 'image', 'file', 'system'
  is_read: Boolean,
  read_at: Date,
  delivered: Boolean,
  metadata: Object,
  timestamp: Date
}

// Insight Model
Insight {
  conversation_id: String,
  summary: String,
  sentiment: String,      // 'Positive', 'Negative', 'Neutral'
  user_id: Number,        // References PostgreSQL User ID
  message_count: Number,
  analysis_date: Date
}
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run test suite (if available)
npx prisma generate # Generate Prisma client
npx prisma migrate dev --name [name]  # Create and apply migration
npx prisma studio   # Open Prisma database GUI
npx prisma db push  # Push schema changes to database
```

## 🛡️ Security Features

- **JWT Token Authentication** with configurable expiration
- **Password Hashing** using bcryptjs with salt rounds
- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **Input Validation** with Joi schemas
- **SQL Injection Prevention** with Prisma ORM
- **NoSQL Injection Prevention** with Mongoose ODM
- **Rate Limiting** ready implementation
- **Environment Variable Protection**
- **Secure Password Reset** with time-limited tokens

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongo_uri
DATABASE_URL=your_production_postgres_uri
JWT_SECRET=your_production_jwt_secret
OPENAI_API_KEY=your_production_openai_key
FRONTEND_URL=your_production_frontend_url
```

### Docker Support

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all endpoints follow RESTful conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@veroapp.com
- 🐛 [Issue Tracker](https://github.com/your-username/vero-chat-app/issues)
- 📚 [Documentation Wiki](https://github.com/your-username/vero-chat-app/wiki)
- 💬 [Discussion Forum](https://github.com/your-username/vero-chat-app/discussions)

## 🙏 Acknowledgments

- **OpenAI** for GPT integration and AI capabilities
- **MongoDB** and **PostgreSQL** communities for excellent databases
- **Socket.io** for real-time communication capabilities
- **Express.js** team for the robust web framework
- **Prisma** team for the modern database toolkit
- **JWT** community for authentication standards

## 📊 Performance Considerations

- **Database Indexing**: Optimized indexes for frequent queries
- **Pagination**: Implemented for large message histories
- **WebSocket Efficiency**: Minimal data transfer for real-time features
- **Caching Ready**: Architecture supports Redis integration
- **Load Balancing**: Stateless design for horizontal scaling

---

<div align="center">

**Built with ❤️ for the developer community**

[⬆ Back to Top](#vero---ai-powered-real-time-chat-application)

</div>
