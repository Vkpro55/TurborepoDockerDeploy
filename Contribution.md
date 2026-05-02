## Docker Installation
1. git clone <https://github.com/Vkpro55/TurborepoDockerDeploy>
2. cd TurborepoDockerDeploy
3. create network
    i. docker network create monorepo-network'
4. run the postgres inside the docker
    i. docker run --name docker-postgres -p 5433:5432 -e POSTGRES_PASSWORD=mydbpass -e POSTGRES_DB=mydockerdb -d --network monorepo-network postgres:latest
4. build the backend image & run container
    i. docker build -t backend-image -f docker/dockerfile.backend .
    ii. docker run --name backend-container -p 4000:4000 --network monorepo-network backend-image:latest
5. build the websocket image & run container
    i. docker build -t websocket-image -f docker/dockerfile.websocket .
    ii. docker run --name websocket-container -p 8080:8080 --network monorepo-network websocket-image:latest
6. build the web image & run container 
    i. docker build --build-arg DATABASE_URL="postgresql://postgres:mydbpass@localhost:5433/mydockerdb" --network=host -t web-image -f docker/dockerfile.web .
    ii. docker run --name web-container -p 3000:3000 --network monorepo-network web-image:latest                                                      


# Docker-compose Installation
1. docker-compose up