# Dockerizing Things Demo

![Demo](https://raw.githubusercontent.com/dunckr/dockerizing-things-demo/master/demo.jpg)

Demo for [talk](http://dunckr.github.io/dockerizing-things-talk/dist/#/) about working with Docker

## Install

```sh
brew install docker boot2docker docker-machine docker-compose virtualmachine
docker-machine create --driver virtualbox --virtualbox-memory 3076 dev
docker-machine start dev
eval "$(docker-machine env dev)"
```

## Start

```sh
make build
make start
open http://`docker-machine ip dev`
```

## Logs

```sh
make status
```

## License

MIT © [Duncan Beaton](http://dunckr.com)
