.PHONY: install-development
build-development: ## Install the development packages.
	npm ci && ls -al

.PHONY: build-development
build-development: ## Build the development Next.Js application.
	CI=false npm run build
  ls -al ./.next

.PHONY: start-development
start-development: ## Start the development PM2 manager.
	pm2 start npm --name "craftscript.com" -- start
  
.PHONY: build-production
build-production: ## Build the production packages.


.PHONY: start-production
start-production: ## Start the production Next.Js application.


.PHONY: stop-production
stop-production: ## Stop the production PM2 manager.
