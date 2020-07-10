
# Porper (Portable Permission Controller) UI

Overview
=================

This is a very basic UI to demonstrate the Porper features interacting with [porper-api][porper-api-url] interfaces implemented by ReactJS and Redux.

## How to use Google+ and Github Authentication

Please see these 2 sites to find out how to setup OpenID connect

Google+ : https://developers.google.com/identity/protocols/OpenIDConnect

GitHut : https://developer.github.com/v3/oauth/


## Configuration

Fill up the configuration file, '/utilities/global.json', with the Porper API url and GitHub Auth information
```
module.exports = {
  apiUrl: "<Porper API url>",
  callbackUrl: "<callback url after GitHub Auth, which must be same with the one in defined in GitHub Auth Application>",
  githubAuthUrl: "https://github.com/login/oauth/authorize?scope=user&client_id=<GitHub Auth client_id>"
};
```

Fill up the 'content' of 'google-signin-client_id' meta data in both '/index.html' and '/html/index.html'
```
<meta name="google-signin-client_id" content="<Google+ Auth client_id>"
```

## Usage

__Install the dependencies:__

`npm install`

__Development mode with livereload:__

`npm run watch`

__When you are done, create a production ready version of the JS bundle:__

`npm run build`


## Sungard Availability Services | Labs
[![Sungard Availability Services | Labs][labs-image]][labs-github-url]

This project is maintained by the Labs team at [Sungard Availability
Services][sungardas-url]

GitHub: [https://sungardas.github.io][sungardas-github-url]

Blog: [http://blog.sungardas.com/CTOLabs/][sungardaslabs-blog-url]

[porper-api-url]: https://github.com/SungardAS/porper-api
[labs-github-url]: https://sungardas.github.io
[labs-image]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[sungardas-github-url]: https://sungardas.github.io
[sungardas-url]: http://sungardas.com
[sungardaslabs-blog-url]: http://blog.sungardas.com/CTOLabs/
# test
