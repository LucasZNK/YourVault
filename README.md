# YourVault

This is a web application built with With Tauri, React + Rust that allows users to generate a private key and a mnemonic phrase, based on a username, password, and a PIN. The app also includes a keyboard for users to input their PIN and change the positions of the numbers on each click to despiste loggers and a feature to copy the generated key and mnemonic to the clipboard.

`UI IN PROGRESS `

https://user-images.githubusercontent.com/57494138/230270090-cbacc063-6dc3-43af-9270-cd98abca5922.mov

## Getting Started

To run this application locally, first, clone this repository:

Then, navigate to the project's directory and install the dependencies: You are going to need some extra tools for rust.

Complete pre-requisites from tauri

`https://tauri.app/v1/guides/getting-started/prerequisites`

```
cd yourvault
```

```
npm install
```

Finally, start the development server:

Install in your machine (review the code first to be safe)
` npm run tauri build`

For dev

```
npm tauri dev
```

[README IN PROGRESS, NEED TO ADD MORE STEPS]

# Motivation:

The goal of creating this application is to allow users to generate deterministic private keys and mnemonic phrases using a combination of their username, password, and a PIN. This offers a secure and easy-to-remember way to store and access their private keys across different blockchain networks such as Ethereum, Matic, Binance Smart Chain, and others, without the need to physically or digitally store them.

Being deterministic, the process of generating private keys and mnemonic phrases will always produce the same output, as long as the same input values are used. This allows users to consistently access their funds, without needing to remember a complex private key or store a private key in an insecure location.

With this application, users can easily and securely access their funds, knowing that they will always have access to their private keys and mnemonic phrases, as long as they remember their username, password, and PIN.

It's important to note that this application is not a wallet itself, but rather a tool to generate private keys. For example, if you generate your private key using this application based on the data you entered and then go on a trip, you can download the application again and enter the same data to generate the same private key to import and use wherever you need it.

However, it's crucial to keep in mind that anyone who obtains your username, password, and PIN will also have access to the same private key. Therefore, it's recommended to be careful with this information and keep it secure at all times. This application only generates private keys and does not store them, so it's the responsibility of the user to keep their information safe.

# How this create secure keys?

This is a small Rust program that uses some third-party packages to generate a private key and its corresponding mnemonic phrase from a given input. The following functions and algorithms are used:

generate_private_key_from_input(input: &str) -> H256: This function takes an input string and uses it as a seed to generate a 32-byte private key using the SHA3-256 cryptographic hash function. It returns the private key as an H256 data type, which is an array of 32 bytes.

private_key_to_mnemonic(private_key: &H256) -> String: This function takes the private key generated in the previous function and converts it to a 12-word mnemonic phrase using the BIP39 standard and the English word dictionary. It returns the mnemonic phrase as a text string.

generate_values(username: String, password: String, pin: String) -> (String, String): This is the function that is exposed as a Tauri command, which means it can be called from a Tauri application. It takes three text string arguments: username, password, and pin. These are concatenated and used as input to generate the private key and mnemonic phrase using the functions mentioned above. It returns the private key and mnemonic phrase as a tuple.

zeroize(): This is a function from the zeroize library that is used to clear the memory of the input variable that contains the original input after it has been used to generate the private key. This is important to prevent leakage of confidential information in the computer's memory.

Additionally, you can see a special compilation directive #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] that indicates that the program should compile in release mode for Windows, which means that there will be no command console associated with the application.

# Warnings [ READ PLEASE ]

The following are some important warnings that you should be aware of before modifying or using this code:

Modify at your own risk: This code generates a private key and a mnemonic phrase based on a username, password, and a PIN. Modifying any part of this code may affect the generation process, and result in loss of access to your funds. It is recommended that you do not modify this code unless you fully understand its implications.
Not audited for security: This code has not been audited for security, and its use is at your own risk. It is recommended that you do not use this code with significant amounts of funds.

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
