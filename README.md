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

**lecture**

- ``run -p local-port:server-port`` - port mapping
- ``run -v`` - mapping directories
- ``exec -it ID sh`` - run container shell
- ``netwokt ls`` - show networking 
- ``network inspect`` - show extra details
- ``network create NAME`` - create own docker network

### Something 

- ``ip addr`` - IP checking
