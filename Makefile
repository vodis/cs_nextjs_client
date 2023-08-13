.PHONY: build-development
build-development: ## Build the development Next.Js application.
	npm ci
	CI=false npm run build
	ls -al ./.next

.PHONY: start-development
start-development: ## Start the development PM2 manager.
	@if ! command -v pm2 &> /dev/null; then \
		npm install pm2 -g; \
	fi
	pm2 delete craftscript.com || true
	pm2 start npm --name "craftscript.com" -- start
