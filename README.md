# WiV Project

#### Issues that I ran into when I was creating the project and how I solved them:

-The first issue that I ran into was with the Web 3.0 package. When I installed the package, there were issues with other dependencies. Apparently, this was the issue with the webpack so I needed to install more dependencies and create a config file that would have resolved the issue.

-Next I had a small problem with finding the ABI of the smart contract, but after a little bit of research I managed to find it.

-I had trouble with the smart contract and the methods from the smart contract. I learned that when working with Web 3.0 I need to use asynchronous functions which I tried to do, but when I did that I would get fewer NFTs than expected so I removed that part from the code, and I am still trying to investigate why was that the issue.

-The last issue I had was with the API, so first I thought that we just need to set url in the specific lwin but that wasn't the case. I had trouble with setting the client key and secret, but after some time I found the solution. Also when I was getting the prices from the API, I didn't know that there are different price types and that I needed to include them, but after reading trough Price Data API I figured it out and it was working just fine.

# ENV File Variables

```
VUE_APP_CLIENT_KEY=1fcd0df0-07ea-44d3-bf56-0453ab1d7dca
VUE_APP_CLIENT_SECRET=sqMSah0k
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration
