
<a href="https://web-session.vercel.app/"><img title="SCAN QR" src="https://img.shields.io/badge/GET SESSION-h?color=black&style=for-the-badge&logo=msi"></a>

<a href="https://github.com/Astropeda/Asta-Md/fork"><img title="Fork Repo" src="https://img.shields.io/badge/Fork Repo-h?color=black&style=for-the-badge&logo=stackshare">

1. Create a new file in the `plugins` directory, for example `hi.js`.
2. Define the command logic using the following template:
    ```javascript
    import amd from './lib';
    
    amd(
      {
        pattern: "master", // The Command Name
        alias: "hello" // Command Secondary Trigger
        fromMe: true, // is the message from the owner
        desc: "Send Hi Message", // Command Description
        type: "Test", // Command Category
      },
      async (message) => {
        await message.send("Hello There");
      }
    );
    ```

 ### Termux Setup

 ```bash
termux-setup-storage
apt update
apt upgrade
pkg update && pkg upgrade
pkg install bash
pkg install libwebp
pkg install git -y
pkg install nodejs -y 
pkg install ffmpeg -y 
pkg install wget
pkg install imagemagick -y
git clone Your Forked Github Url
cd MASTER-MD-V2
npm i
npm start
```

