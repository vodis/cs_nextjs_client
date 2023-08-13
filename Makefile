.PHONY: build-development
build-development: ## Build the development Next.Js application.
	npm ci
	CI=false npm run build
	ls -al ./.next

.PHONY: start-development
start-development: ## Start the development PM2 manager.
	npm install pm2 -g
	pm2 start npm --name "craftscript.com" -- start