# Node server

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
