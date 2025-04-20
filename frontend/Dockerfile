#define what image to build from
FROM node:20
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
