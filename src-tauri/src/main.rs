#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ethereum_types::H256;
use sha3::{Digest, Sha3_256};
use bip39::{Mnemonic, Language};
use tauri::command;
use zeroize::Zeroize;

#[command]
fn generate_values(username: String, password: String, pin: String) -> (String, String) {
    let mut input = format!("{}{}{}", username, password, pin);
    let private_key = generate_private_key_from_input(&input);
    input.zeroize();
    let mnemonic = private_key_to_mnemonic(&private_key);
    (format!("0x{:x}", private_key), mnemonic)
}

fn generate_private_key_from_input(input: &str) -> H256 {
    let mut hasher = Sha3_256::new();
    hasher.update(input.as_bytes());
    let result = hasher.finalize();
    H256::from_slice(&result)
}

fn private_key_to_mnemonic(private_key: &H256) -> String {
    let mnemonic = Mnemonic::from_entropy(private_key.as_bytes(), Language::English).unwrap();
    mnemonic.to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_values])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
