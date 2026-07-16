STACK_NAME := hotelapp
REDIS_SERVICE := redis
REDIS_ID := $(shell docker ps -f "ancestor=redis:7.0.2-bullseye" -q)

net:
	docker network create -d overlay --attachable testinetti \
		--opt encrypted=true

pull:
	docker pull redis:7.0.2-bullseye

logs:
	docker service logs -f $(STACK_NAME)_redis

# ONLY WORKS FOR LOCAL DEPLOYMENT
cache:
	docker exec -t $(REDIS_ID) redis-cli --scan --pattern '*'

# ONLY WORKS FOR LOCAL DEPLOYMENT
flushcache:
	docker exec -t $(REDIS_ID) redis-cli FLUSHALL

deploys: redis.yml
	docker stack deploy --compose-file redis.yml $(STACK_NAME)

init:
	sh redis-init.sh --docker-ctx x220 --swarm \
		--image redis:7.0.2-bullseye \
		--stack $(STACK_NAME) --name redis \
		--root $(PWD)

clean:
	docker stack rm $(STACK_NAME)
	docker network rm testinetti

.PHONY: clean init deploy flushcache cache logs net
