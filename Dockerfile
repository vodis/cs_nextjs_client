# syntax=docker/dockerfile:1
# Private npm: pass token at build time with BuildKit — not ARG/ENV (avoids SecretsUsedInArgOrEnv).
# Example: docker buildx build --secret id=npm_token,src=$HOME/.npm-token .

FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=secret,id=npm_token \
    sh -c 'set -e; \
      NPM_TOKEN=$(tr -d "\n\r" </run/secrets/npm_token); \
      [ -n "$NPM_TOKEN" ] || (echo "BuildKit secret npm_token is required for @vodis/ui-kit" >&2; exit 1); \
      printf "%s\n" "@vodis:registry=https://npm.pkg.github.com/" "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc; \
      npm ci; \
      rm -f .npmrc'

FROM node:24-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
