# cloud-technologies

Cloud technologies repository, semester IV.

### lab01

- ``ps -a`` - show all containers
- ``pull`` - download docker image
- ``run`` - create a container from an image
- ``start -a`` - start container with input/output signals
- ``rm`` - delete a stopped container
- ``rmi`` - delete image
- ``stop`` - stop container
- ``kill`` - force stop
- ``prune`` - ???

### lab02

- ``run -it`` - create container and start with input/output signals
- ``logs`` - get logs from container
- ``exec`` - access the running container / execute the command inside the container
- ``create`` - create container

### lab03

- ``build -f filename .`` - build custom docker image with name ``filename``

### lab04

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

### lab05

- ``network create name`` - creates a new network
- ``network ls`` - lists all the networks the docker knows about
- ``network rm name`` - removes one or more networks by name or identifier
- ``network inspect name`` - returns information about one or more networks
- ``docker network connect NETWORK CONTAINER`` - connects a container to a network

## lab06

- ``docker-compose up`` - builds, starts, and attaches to containers for a service
- ``docker-compose up -d`` - run containers in the background
- ``docker-compose stop`` - stops running containers without removing them
- ``docker-compose down --volumes`` - stops containers and remove named volumes declared in the volumes section of the Compose file

### lectures

- ``run -p local-port:server-port`` - port mapping
- ``run -v`` - mapping directories
- ``exec -it ID sh`` - run container shell
- ``network ls`` - show networking
- ``network inspect`` - show extra details
- ``network create NAME`` - create own docker network

### kubectl

- `get pods` - prints a table of the most important information about the specified resources
- `get all` - prints all
- `describe TYPE NAME` - will print debug information about the given resource
- `create -f NAME` - create a resource from a file or from stdin
- `delete TYPE NAME` - delete resources by file names
- `apply -f NAME` - apply a configuration to a resource by file name or stdin
- `scale --replicas=XXX -f NAME` - set a new size for a deployment
- `logs -f NAME` - print the logs for a container in a pod or specified resource
- `exec -it NAME -- COMMAND` - execute a command in a container
  
### kubectl - types

- pod
- replicaset
- deployment
- nodeport
- configmaps
- [more](https://kubernetes.io/docs/reference/kubectl/#resource-types)
  
### Something

- ``ip addr`` - IP checking

### My docker images

- https://hub.docker.com/repository/docker/azalurg/node-server
