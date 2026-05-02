REGISTRY ?= dstixx05
BACKEND_IMAGE = $(REGISTRY)/intermediate-backend:latest
FRONTEND_IMAGE = $(REGISTRY)/intermediate-frontend:latest

.PHONY: all build-backend build-frontend push-backend push-frontend deploy apply

all: build-backend build-frontend

build-backend:
	docker build -t $(BACKEND_IMAGE) -f ../backend/Dockerfile ../backend

build-frontend:
	docker build -t $(FRONTEND_IMAGE) -f ../frontend/Dockerfile ../frontend

push-backend:
	docker push $(BACKEND_IMAGE)

push-frontend:
	docker push $(FRONTEND_IMAGE)

push: push-backend push-frontend

deploy: apply

apply:
	kubectl apply -f deployments-and-services.yaml -n app || kubectl apply -f deployments-and-services.yaml
