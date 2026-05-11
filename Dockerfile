# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

ARG NPM_TOKEN
RUN test -n "$NPM_TOKEN" || (echo "NPM_TOKEN build-arg is required for @vodis/ui-kit" >&2; exit 1)
RUN printf '%s\n' \
  '@vodis:registry=https://npm.pkg.github.com/' \
  "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" \
  > .npmrc \
  && npm ci \
  && rm -f .npmrc

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:20-alpine AS runner
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
