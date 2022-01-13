
Diet Manager. 
## Usage
### Run in classic mode (with out docker)

- clone
- On the terminal run: `npm install` to install dependencies
- Start production mode: `npm run start`

### Run as a docker image
- clone
- On the terminal run: `npm install` to install dependencies
- Build a docker image of the app: `docker-compose -f docker-compose.yml docker-compose.prod.yml up -d --build`
- Start(run) the image: `docker-compose -f docker-compose.yml docker-compose.prod.yml up`

## Docs
App [docs](https://documenter.getpostman.com/view/11042977/UVXhpwM2)