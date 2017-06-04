# NerutiDemo (Frontend) - Sentiment Analysis Map Visualisation (SAMV)
>   by Neruti Developers

![sentiment analysis image](/images/sentiment-analysis-malaysia.png)

This application(SAMV) is for demo purpose only due to limited capabilities in the following areas:

  - Word Standardization 
  - Language Detection
  - Model is pretrained using Stanford Sentiment Treebank
  - Lemmatization
  - Removing not usable symbols 

# Version

  - 12 April 2017 - The first version pushed - 1.0

### Backend
Please visit [SAMV Backend Repo](https://github.com/neruti-developers/neruti-demo-backend) for more.

### Installation of Frontend

SAMV Frontend requires nodejs and npm. 

The demo is tested on ***Ubuntu 16.04*** Platform.

Clone/ Fork this repo and get started

```sh
$ cd nrt-demo-frontend
$ npm install
$ npm start
```

# Bugs
As this is a demo for Neruti Developers and fixing bugs are not our priority in this repo.
  - Stopping Twitter Stream, SparkSession may not execute
  - Only able to open one instance/tab to query one search term at a time. This is due to sharing of Twitter application 
  key/OAuth Key, this can be fixed by allowing user to submit their own OAuth key in frontend and every submission of 
  query will call TwitterUtil again
  - Unable to catch exception in frontend connection if backend connection has been closed

### Contributor List
*Austin Goh*  - austin@neruti.com 

---
***Disclaimer*** *This repo is provided as it-is.  No technical suppoort will be provided.  If you require commercial technical support, please contact info@neruti.com*

Enjoy, 
*Austin (zhao yang)*


