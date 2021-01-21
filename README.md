# Quick QR Code API

The API upon recieveing a POST request with the text to be encoded into QR code generates an unique ID and generates the respective QR Code. Then it converts the QR Code into PNG format, renames it with the same as UID and saves on the Cloudinary. It gives back the respnse which consists of the UID and the link for the code. To get the QR Code from the UID we can send a GET request to the API which in response sends the public link of the code image available via CDN. To delete the QR Code from the cloud storage we can send a DELETE request to the API.

Postman Workspace URL: https://www.postman.com/darkpanda08/workspace/quick-qr-code-api/overview

API URL: https://qrcode-gene.herokuapp.com

## Installation

This API requires [Node.js](https://nodejs.org/) to run.

Run the following command to clone the repository and install the dependencies and devDependencies.

```sh
$ git clone https://github.com/darkpanda08/qrcode-api.git
$ cd qrcode-api
$ npm install
```
> Rename the .env.example file to .env and fill the credentials required.

To run in development mode...
```sh
$ npm run dev
```
To run production mode...

```sh
$ npm start
```
