# cloud-technologies
Cloud technologies repository, semester IV.

## cheat sheet

**lab01**

- ``ps -a`` - show all containers
- ``pull`` - download docker image
- ``run`` - create a container from an image
- ``start -a`` - start container with input/output signals
- ``rm`` - delete a stopped container
- ``rmi`` - delete image
- ``stop`` - stop container
- ``kill`` - force stop 
- ``prune`` - ???

**lab02**

- ``run -it`` - create container and start with input/output signals
- ``logs`` - get logs from container
- ``exec`` - access the running container / execute the command inside the container
- ``create`` - create container

**lab03**

- ``build -f failname .`` - build custom docker image with name ``filename``

**lab04**

```Docker
FROM node:14                    
WORKDIR /usr/src/my_node_app
COPY ./package.json ./
RUN npm i
COPY ./index.js ./
EXPOSE 8080
CMD node index.js
```

- ``FROM`` - set the base image
- ``WORKDIR`` - set the working directory
- ``COPY`` - copy files or folders from source to the dest path
- ``RUN`` - execute any commands on top of the current image
- ``EXPOSE`` - define the network ports that this container will listen on at runtime
- ``CMD`` - provide defaults for an executing container, there can only be one CMD instruction in a Dockerfile

**lectures**

- ``run -p local-port:server-port`` - port mapping
- ``run -v`` - mapping directories
- ``exec -it ID sh`` - run container shell
- ``netwokt ls`` - show networking
- ``network inspect`` - show extra details
- ``network create NAME`` - create own docker network

### Something

- ``ip addr`` - IP checking

### My docker images

- https://hub.docker.com/repository/docker/azalurg/node-server
