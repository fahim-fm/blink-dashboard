# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

# Use JS/WASM fallback for lightningcss to avoid missing native binaries
ENV NEXT_DISABLE_LIGHTNINGCSS=1

# Copy package files (use bun.lock if present)
COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies with Bun (respects bun.lock if present)
RUN bun install

# Copy application code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Use JS/WASM fallback for lightningcss in runtime too
ENV NEXT_DISABLE_LIGHTNINGCSS=1

# Install dumb-init for proper signal handling
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# Copy built application from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./

# Create non-root user for security
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs nextjs

USER nextjs

EXPOSE 3000

ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["bun", "run", "start"]