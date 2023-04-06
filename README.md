# YourVault

This is a web application built with With Tauri, React + Rust that allows users to generate a private key and a mnemonic phrase, based on a username, password, and a PIN. The app also includes a keyboard for users to input their PIN and change the positions of the numbers on each click to despiste loggers and a feature to copy the generated key and mnemonic to the clipboard.

`UI IN PROGRESS `

https://user-images.githubusercontent.com/57494138/230270090-cbacc063-6dc3-43af-9270-cd98abca5922.mov

## Protecting Your Funds: Why We Choose Not to Distribute Complicated Executables for Our Desktop App

We choose not to distribute a complicated executable for our desktop app because our goal is for you to have control and full transparency over the software installed on your computer, especially when it comes to handling your funds. The idea is for you to build and install the app on your computer like any other program, but with the added benefit of being able to review the code beforehand and build it yourself. This process allows you to ensure that there is nothing suspicious or malicious in the code, providing an extra layer of security for your funds.

Furthermore, it's important to note that our desktop app does not require an internet connection to function properly. This means that you can use it offline without any issues. We believe that by providing a completely offline solution, we can offer a higher level of security for your funds, as there is no risk of your private information or keys being transmitted over the internet. This is just one more way in which our app is designed to prioritize your security and peace of mind.

## How to use the app

To use the app, simply enter the username of your choice, along with a password and a pin. This combination will create a unique and irreproducible key that will always remain the same whenever you enter the same three inputs. This means that you don't have to worry about storing a key with multiple words on a piece of paper or in a digital document. Instead, you can simply make a note of or remember these three pieces of information.

It's worth noting that you can uninstall this app or install it on any device of your choice. As long as you enter the same three values (username, password, and pin), you'll always get the same private key to access your wallet. This means that you can build and install the app on multiple devices without worrying about losing access to your funds, as long as you remember your username, password, and pin combination.

For example:

Username: nftwallet

Password: moon
Pin: 1234

This combination will create a unique key that you only need to remember.

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

Never reveal your login credentials.
Never share your private key or mnemonic phrase. Nobody should ever ask you for this information, and if they do, it's likely a scam.
Be cautious if someone gains access to your computer. While our app takes measures to clean up memory, it's not possible to keep anything secure on a compromised computer.
Before sending a large amount of money, make sure to do some testing. Generate your key, delete everything, and then try entering the same information again to ensure that it generates the same key every time.
Don't lose your access credentials. If you forget your login credentials and don't have your private key backed up, there is no way to recover your funds. Be sure to keep your login information safe and secure.

Modify at your own risk: This code generates a private key and a mnemonic phrase based on a username, password, and a PIN. Modifying any part of this code may affect the generation process, and result in loss of access to your funds. It is recommended that you do not modify this code unless you fully understand its implications.

License
This project is licensed under the MIT license. See LICENSE for more information.
