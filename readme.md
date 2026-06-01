# MOVIE RESERVATION SYSTEM

## File structure

src/
├─ config/
│  ├─ prisma.ts        # Prisma client initialization
│  ├─ oauth.ts         # Auth configs
│  └─ env.ts           # Environment variables
│
├─ modules/
│  ├─ user/
│  │  ├─ user.controller.ts
│  │  ├─ user.service.ts
│  │  ├─ user.routes.ts
│  │  └─ user.dto.ts    # input/output types
│  │
│  ├─ movie/
│  │  ├─ movie.controller.ts
│  │  ├─ movie.service.ts
│  │  ├─ movie.routes.ts
│  │  └─ movie.dto.ts
│  │
│  ├─ theatre/
│  │  ├─ theatre.controller.ts
│  │  ├─ theatre.service.ts
│  │  ├─ theatre.routes.ts
│  │  └─ theatre.dto.ts
│  │
│  ├─ showtime/
│  │  ├─ showtime.controller.ts
│  │  ├─ showtime.service.ts
│  │  ├─ showtime.routes.ts
│  │  └─ showtime.dto.ts
│  │
│  └─ ticket/
│     ├─ ticket.controller.ts
│     ├─ ticket.service.ts
│     ├─ ticket.routes.ts
│     └─ ticket.dto.ts
│
├─ utils/
│  ├─ logger.ts
│  ├─ errorHandler.ts
│  └─ validators.ts
│
├─ middlewares/
│  ├─ auth.middleware.ts
│  ├─ validation.middleware.ts
│  └─ rateLimit.middleware.ts
│
├─ app.ts             # Express app setup
├─ server.ts          # Server entry point
└─ routes.ts          # Mount all module routes
