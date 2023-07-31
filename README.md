## Authentication

- Sign In
- Sign Up,
- Reset Password
- Update Profile
- Update Password
- Update Email
- Update User Avatar
- Delete Profile
- Reset Password by E-mail
- Verification Profile by E-mail
- Signed Out Access Token blacklisting by Redis
- Image Upload (public storage, Many-to-many relationships)
- Multi language by i18Next
- E-mail notifications

### Redis

Download Redis for Windows from the official [website](https://redis.io/docs/getting-started/installation/install-redis-on-windows/).

_Mac (using [homebrew](http://brew.sh/)):_

```bash
brew install redis
```

_Linux:_

```bash
sudo apt-get install redis-server
```

### MongoDB

After installing MongoDB, the next step is to set up a single node replication. This is needed because certain features such as change streams (which we need for our Node.js application to interact with MongoDB) are only available in MongoDB's replica set configurations.

Please follow these steps:

1. **Download MongoDB**:

   Download the MongoDB Community Server from the MongoDB official [download page](https://www.mongodb.com/try/download/community). Choose the version suitable for your Windows operating system and download the .msi file.

2. **Install MongoDB**:

   Run the .msi installer and follow the setup wizard. install it as a service

3. **Find and edit the MongoDB configuration file**

   The MongoDB configuration file, `mongod.cfg`, is typically located in the `\bin` directory of your MongoDB installation path. For example, it might be in a directory like `C:\Program Files\MongoDB\Server\6.3\bin`. Navigate to this directory and open `mongod.cfg` in a text editor of your choice.

4. **Add the replication settings**

   In the `mongod.cfg` file, you'll need to add a section for replication. If it doesn't exist, add the following lines to the end of your file:

   ```yaml
   replication:
     replSetName: 'rs0'
   ```

   Here, `rs0` is the name of the replica set. You can replace this with a name of your choice.

5. **Restart MongoDB service**

   After saving your changes, you need to restart the MongoDB service for the changes to take effect. You can do this from the Services management console in Windows, or from the command line:

   ```bash
   net stop MongoDB
   net start MongoDB
   ```

6. **Initiate the replica set**

   Next, you need to connect to your MongoDB instance and initiate the replica set. You can do this with the `mongosh` shell:

   ```bash
   mongosh
   ```

   ( if mongosh is an invalid command, follow this link on a guide to install it [here](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install) )
   This will open the MongoDB shell. In the shell, enter the following commands:

   ```javascript
   rs.initiate()
   ```

   After running the `rs.initiate()` command, you should see a message indicating that the replica set has been successfully initiated.

Now, your MongoDB instance is running as a single node replica set, and you can use features such as change streams.

Please, continue with your project setup as described in the previous steps of this guide.

### Setup

You can install Node modules using either [npm](https://www.npmjs.com/) or [npm](https://npmpkg.com/), which are both package managers for Node.js.

```bash
npm install # or npm install
```

COPY .env.example to .env

```bash
cp .env.example .env
```

### API Start

```bash
npm start
npm run watch:win
npm run build
```

### ESlint Start

```bash
npm run lint
```

### Prettier Start

```bash
npm run prettier # or npm run prettier
npm run prettier:write # or npm run prettier:write - with prefix --fix
```
