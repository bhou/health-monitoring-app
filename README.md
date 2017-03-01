# health-monitoring-app

React / Redux / Collar.js / Collux

## Understand the architecture and data flow:

1.install collar dev server

```text
> sudo npm install -g collar-dev-server
```

2.run collar dev server, and open [http://localhost:7500?view=hierarchy.td&perspective=arch](http://localhost:7500?view=hierarchy.td&perspective=arch)
```text
> collar-dev-server
```

3.open [https://bhou.github.io/health-monitoring-app](https://bhou.github.io/health-monitoring-app), 
and check [http://localhost:7500?view=hierarchy.td&perspective=arch](http://localhost:7500?view=hierarchy.td&perspective=arch)


## How to run it locally

```text
npm run start
```

## Build for deploy

```text
npm run build
```

## Test

```text
npm run test
```

## Q & A

Q: Why refreshing [https://bhou.github.io/health-monitoring-app/login](https://bhou.github.io/health-monitoring-app/login) returns 404?

A: Collux use browser history to support client side routing. [https://bhou.github.io/health-monitoring-app](https://bhou.github.io/health-monitoring-app) is hosted 
on Github Pages, which does not support Routers that use HTML5 `pushState`. You need always acces  See `create-react-app`'s official doc:

> GitHub Pages doesn’t support routers that use the HTML5 pushState history API under the hood (for example, React Router using browserHistory). This is because when there is a fresh page load for a url like http://user.github.io/todomvc/todos/42, where /todos/42 is a frontend route, the GitHub Pages server returns 404 because it knows nothing of /todos/42. 


