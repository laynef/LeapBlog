# Leap Blog (In Progress)

- A blog web application and mobile app with many popular backend frameworks
- Frontend is written in Node.js / Server side React&Redux for web
- Frontend for mobile is React Native
- Automatic deployment scripts set up in deploy

## Backend Frameworks

### Java: Sprint Boot
### JavaScript: Node.js
### PHP: Laravel
### Python: Django

### Ruby: Ruby on Rails

### Web

- Server side React and Redux on a Node.js server
- Sass for styling with server side Bootstrap & Font Awesome

#### Installation

- Add: "127.0.0.1 leapblog.api" to your host file
```
sudo pico /etc/hosts
127.0.0.1 leapblog.api
```
Save the File in Pico
```
CRL + X
Y
ENTER
```

Run Command
```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain rubyonrails/openssl/leap-frog-api-development-cert.pem
```

- To Run Application
```
npm install
npm run clean:prod
npm run build:prod

// For multithreaded server
node multithreaded.js

// For single threaded
node app.js
```

### Scala: Play

## Frontend

### Web

![YAP](/docs/web-homepage.png)

- Server side React and Redux on a Node.js server
- Sass for styling with server side Bootstrap & Font Awesome

#### Installation

- Add: "127.0.0.1 leapblog.app" to your host file
```
sudo pico /etc/hosts
127.0.0.1 leapblog.app
```
Save the File in Pico
```
CRL + X
Y
ENTER
```

Run Command
```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain web/openssl/leap-frog-app-development-cert.pem
```

- To Run Application
```
npm install
npm run clean:prod
npm run build:prod

// For multithreaded server
node multithreaded.js

// For single threaded
node app.js
```

