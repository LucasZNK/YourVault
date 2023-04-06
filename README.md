# YourVault

This is a web application built with React that allows users to generate a private key and a mnemonic phrase, based on a username, password, and a PIN. The app also includes a keyboard for users to input their PIN, and a feature to copy the generated key and mnemonic to the clipboard.

## Getting Started

To run this application locally, first, clone this repository:

bash
Copy code
`https://github.com/LucasZNK/YourVault`

Then, navigate to the project's directory and install the dependencies:

```
cd yourvault
```

```
npm install
```

Finally, start the development server:

```
npm tauri dev
```

[README IN PROGRESS, NEED TO ADD MORE STEPS]

`Upon running the application, users can input their username, password, and PIN, and click the "Generate" button to get their private key and mnemonic phrase. Users can also click the "Copy" button to copy each generated value to the clipboard.`

`The app also includes a keyboard for users to input their PIN, which shuffles its keys randomly every time a number is pressed.`
`To clear all fields, click the "Clear" button.`

# Warnings

The following are some important warnings that you should be aware of before modifying or using this code:

Modify at your own risk: This code generates a private key and a mnemonic phrase based on a username, password, and a PIN. Modifying any part of this code may affect the generation process, and result in loss of access to your funds. It is recommended that you do not modify this code unless you fully understand its implications.
Not audited for security: This code has not been audited for security, and its use is at your own risk. It is recommended that you do not use this code with significant amounts of funds.
Unit tests not yet added: At the moment, this code does not have any unit tests to verify the deterministic generation of private keys and mnemonic phrases. It is recommended that you add unit tests to verify the correctness of the generation process.
Not meant for production: This application is not meant to be used in a production environment, and is only intended for educational purposes. It is recommended that you use a trusted wallet provider for storing your funds.

Styles
The styles for this app are a work in progress, and will be updated in the future.

Dependencies
This project uses the following dependencies:

React
Tauri
@tauri-apps/api
Contributing
Contributions to this project are welcome. To get started, please refer to the contributing guidelines.

License
This project is licensed under the MIT license. See LICENSE for more information.

```

```
