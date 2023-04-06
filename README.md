# YourVault

This is a web application built with With Tauri, React + Rust that allows users to generate a private key and a mnemonic phrase, based on a username, password, and a PIN. The app also includes a keyboard for users to input their PIN, and a feature to copy the generated key and mnemonic to the clipboard.

`UI IN PROGRESS `

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

Motivation:

The goal of creating this application is to allow users to generate deterministic private keys and mnemonic phrases using a combination of their username, password, and a PIN. This offers a secure and easy-to-remember way to store and access their private keys across different blockchain networks such as Ethereum, Matic, Binance Smart Chain, and others, without the need to physically or digitally store them.

Being deterministic, the process of generating private keys and mnemonic phrases will always produce the same output, as long as the same input values are used. This allows users to consistently access their funds, without needing to remember a complex private key or store a private key in an insecure location.

With this application, users can easily and securely access their funds, knowing that they will always have access to their private keys and mnemonic phrases, as long as they remember their username, password, and PIN.

It's important to note that this application is not a wallet itself, but rather a tool to generate private keys. For example, if you generate your private key using this application based on the data you entered and then go on a trip, you can download the application again and enter the same data to generate the same private key to import and use wherever you need it.

However, it's crucial to keep in mind that anyone who obtains your username, password, and PIN will also have access to the same private key. Therefore, it's recommended to be careful with this information and keep it secure at all times. This application only generates private keys and does not store them, so it's the responsibility of the user to keep their information safe.

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
