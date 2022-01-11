FROM node:16
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run", "dev"]

#To run docker file....
#docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app-container node-app