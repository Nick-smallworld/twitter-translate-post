# twitter-translate-post

## about this repository

The exprimental implementation using Firebase, DeepL, and Twitter REST API V2.
With this app user can translate tweet into multiple languages and tweet it.


## Prerequisites

- Twitter Account and Developer Project
-- https://developer.twitter.com/en
- Fireabase (Hosting, Authnetication, and Functions)
-- https://firebase.google.com/
- Deep L developer account
-- https://www.deepl.com/pro-api

## Initial Settings

### Environmental variables

First you need to set your API keys and secrets in Firebase's environmental variables.

You need to set:

- Twitter API's Consumer key
- TWitter API's Consumer sercret
- Deep L's API Key

Please log into Firebase with your account and write your keys and secret.
Here is sample settings:

```
firebase functions:config:set env.consumer_key=your_Twitter_Comsumer_key
firebase functions:config:set env.consumer_sercret=your_Twitter_Comsumer_secret
firebase functions:config:set env.deepl_key=your_deepl_key
```

When you want to run under the local emulaton, you need to output your environmental variables as ".runtimeconfig.json". 

The command is:

```
firebase functions:config:get > .runtimeconfig.json
```

Please be careful the secret information is written in the JSON file. Don't forget to ignore the file by .gitignore.


### Modify functions URL's

Index.html in the public directory, the URL's of two functions are written.
Modify the URL with your own Firebase function's URL.

```
fetch('your.cloudfunctions.net
```



