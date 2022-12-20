# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

About the project

Wingspan is a card/boardgame wherein the player is tasked with assembling a collection of birds whose effects can chain together to create increasingly powerful turns. Each bird is represented on a unique card that displays both gameplay and factual data. In fact even the gameplay data is designed to mimic the way the bird is in real life (e.g. if the bird eats berries in real life, the game card will consume berry tokens). The goal of this project was to use these cards, and their approximation to the natural world, as a jumping off point for people to learn more about any specific birds they found interesting.

While the cards create a facsimile to the birds, so too does this visualisation create a facsimile to the cards. The visualisation is designed as a dashboard, with each module roughly correlating to a mechanical/graphical aspect of the card. This allows users to get a wide overview of the information, even at a glance, as they orient themselves based on the game pieces. The interactive elements allow the user to dig deeper into the information, learning more about specific parts of the data, or create additional insights. It would have been nice to do more with the interaction, specifically with creating a follow through from the visualisation to deeper sources of information.

From a technical standpoint, the entire dashboard is built in node. This allowed me to create a generic template page for how it should look, and have it be populated/filtered based on the specific bird that the user is looking for. It would be possible to accomplish a similar effect in D3, but only with significantly more work, and it would also lose out on the ability to save data.

The landing page is a simple introduction to the topic, as well as a search field to look for specific birds. As will be a recurring theme, time became the limiting option when building this out. Ideally it would have had a certain level of autocomplete, and perhaps some way of filtering results. But I decided that my priority should be on the D3 portion of the workload, and while the usability of the homepage isn’t great, it does at least work. If I wanted to keep going with this, I’d also love to create an AR card reader to use the game cards to link directly to the dashboard.

Getting the search working better will likely go along with having more generalised datasets. But for now, a small subset was created of birds that should all be working, albeit there are some glitches even in this data. The are: American Robin; Purple Gallinule; Scissor-Tailed Flycatcher; Common Raven; Morning Dove; Wild Turkey; Tufted Titmouse; Black Vulture; Peregrine Falcon; Black-Billed Magpie; Snowy Egret; Canada goose; Pygmy Nuthatch; Northern Mockingbird; Painted Bunting; Horned Lark; Atlantic puffin; Blue Jay; Greater Roadrunner; Roseate Spoonbill; California Condor; Black Necked Stilt; Barred Owl; Osprey; Northern Cardinal; Trumpeter Swan; Dickcissel; Bald Eagle; Ruby Throated Hummingbird; Mallard. 

Once you look up a specific bird (I’ve been using the Bald Eagle for a lot of my testing) you’re greeted with six unique modules: Image; Biography; Diet; Lifecycle; Range; Wingspan. Each one representing a different aspect of the card, and including the iconography as an indicator (Or at least, it might by the time you’re reading this. As of this writing they’re only text fields). Beyond their relationship to the bird overall, the modules don’t have much else in common, so I’ll dive in to them individually.

Hero image: Images are taken from allaboutbirds.org, one of the Cornell Lab of Ornithology's projects. I tried several API’s to make this work, but in the end it was easier just to include some hrefs in the dataset. Ideally this would use the art found on the game pieces themselves, but alas.

Biography
Dataset: The data here comes from two main sources. Most of the top banner is pulled from a wingspan dataset that a fan created. It’s missing a few key pieces of information, but does a better job than trying to compile it myself. Would want to amend a few things if I continue to work on this project though, notably some missing data points around game actions. The body text came from allaboutbirds.org, being compiled by hand during the same process where the images were retrieved. 

Code: Not much going on here, just plug and play from the datasets. 

Visualisation: The main look of the title bar comes from the book “Celebrating birds” which is a birdwatching guide from the creators of the game. 


Diet
Dataset: This data comes from the Avian Diet Database. While there is a way of working with the data in R, it proved to be too cumbersome for the projects needs. So instead, using the custom list of birds mentioned above, I went through and downloaded the sets individually. The data lacks any sort of consistency however, with some birds listing prey only by weight, others by item, others both. And sometimes the taxonomy was either listed at the wrong level (species in the class level) or simply not useful (“Unidentified Animalia”).

Code: If you dig into the code on this one, you’ll see a lot of experiments that didn’t make it into the final build. In fact there’s an entire callout to the wikipedia API that has gone unused. Beyond that there’s nothing too complicated going on, it calls in the data and creates a donut chart with a few mouse events.

Visualisation: Again, this was scaled back pretty significantly from the initial draft. I realised that it was going to take a significant amount of time to get it to a place I was happy with, which I didn’t have. The main issue was finding ways to construct the dataset from the data we had on hand, as the taxonomic relationship wasn’t present in the dataset. And without that, I couldn’t associate the segments of the chart with the nodes, something to return to. Tooltips were also added to give more insight into each of the segments, which is especially helpful as the plan to colour the segments to match the colours of the food tokens in the game didn’t eventuate.

Lifecycle

Dataset: The dataset for this module is a continuation of the allaboutbirds.org data, and much like in previous modules was collected by hand based on a few criteria I thought might be interesting. Any data that couldn’t be gleaned, such as certain birds lifespans, was googled for. 

Code: I tried a few things to make this work. Initially it was a tree, then it became a network, before finally settling in on a pseudo-scatterplot. The dates are scaled on a log, as the difference between a couple months and several decades can be staggering. Log2 specifically, but only as it was the most aesthetically pleasing.

Visualisation: This is the one I’m least happy with. The basic timeline concept works well, but the tooltips and visual elements are a mess. I don’t think it needs a complete rework, but definitely a lot more consideration.

Range

Dataset: Another of Cornell Lab of Ornithology project, ebird allows users to document bird sightings, which are then collected for use by registered users. There is a complete dataset available for download, but it’s several hundred gb, and the download can be measured in single mb/s, so it would be easier to just fly to Cornell with a usb stick. Instead I pulled down the data for each bird in the list for the last year, which I figured would be sufficient to get an idea of the range. 

Getting the data into a working form was all done in pre-processing. I created a python script that would loop through all the files, and sum up the number of sighting instances for a given county code, to be exported as a json blob (it could’ve been a csv, but chose not to). Unfortunately the data uses not-quite-FIPS, so instead of 01143 it has AZ-143, which had to be changed in order to match the 10m map data. 

Code: The code for this is decidedly straight forward, and not dissimilar to the work we did in class. A few things had to be changed with using JSON though.

Visualisation: Thanks to Ziqi I scoped back my original plan of interweaving shape files pretty significantly, and now it’s done using a Cloropleth on the county level, with colour intensity based on the number of unique sightings. I initially had this as a linear scale, but with data ranging from single digits to tens of thousands a log scale wound up suiting better. This might change depending on the bird, but beyond the scope of this project. 

Wingspan

Dataset: The least complicated bit of data in this entire project. The wingspan dataset contained an int for the wingspan, and so I plugged it in.

Code: It’s all written in a decidedly D3 way, but I wasn’t doing anything particularly data driven. Most of the time coding involved doing the math to ensure everything transformed properly for a given size. I also wound up duplicating the wings, so having a left and a right, as it made said math easier.

Visualisation: There’s a lot less to this one than the others. To put some perspective, added a couple of absolute values, such as condor and hummingbird, to try and get some perspective. It’d be cute to have like a dolphin in here, but between the data and the assets I didn’t have the time. Also space became an issue. Also, because of the ways SVGs render on the page, I had to make sure whatever value we plugged in landed between the two other values, or it’d overlay in weird ways.


