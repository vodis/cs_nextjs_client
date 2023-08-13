.PHONY: build-development
build-development: ## Build the development Next.Js application.
	npm -v
	node -v
	npm ci
	CI=false npm run build
	ls -al ./.next

.PHONY: start-development
start-development: ## Start the development PM2 manager.
	pm2 -v
	pm2 start npm --name "craftscript.com" -- start