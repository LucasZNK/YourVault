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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_different_inputs_produce_different_keys_and_mnemonics() {
        let input1 = ("user1".to_string(), "pass1".to_string(), "1234".to_string());
        let input2 = ("user2".to_string(), "pass2".to_string(), "5678".to_string());

        let (private_key1, mnemonic1) = generate_values(input1.0.clone(), input1.1.clone(), input1.2.clone());
        let (private_key2, mnemonic2) = generate_values(input2.0.clone(), input2.1.clone(), input2.2.clone());

        assert_ne!(private_key1, private_key2);
        assert_ne!(mnemonic1, mnemonic2);
    }

    #[test]
    fn test_same_input_produces_same_key_and_mnemonic() {
        let input = ("user1".to_string(), "pass1".to_string(), "1234".to_string());

        let (private_key1, mnemonic1) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());
        let (private_key2, mnemonic2) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());

        assert_eq!(private_key1, private_key2);
        assert_eq!(mnemonic1, mnemonic2);
    }

    #[test]
    fn test_special_characters_produce_different_keys_and_mnemonics() {
        let input1 = ("user#1".to_string(), "pass$1".to_string(), "@1234".to_string());
        let input2 = ("user#2".to_string(), "pass$2".to_string(), "@5678".to_string());

        let (private_key1, mnemonic1) = generate_values(input1.0.clone(), input1.1.clone(), input1.2.clone());
        let (private_key2, mnemonic2) = generate_values(input2.0.clone(), input2.1.clone(), input2.2.clone());

        assert_ne!(private_key1, private_key2);
        assert_ne!(mnemonic1, mnemonic2);
    }

    #[test]
    fn test_case_sensitive_different_keys_and_mnemonics() {
        let input1 = ("housE".to_string(), "Pass1".to_string(), "1234".to_string());
        let input2 = ("house".to_string(), "pass1".to_string(), "1234".to_string());

        let (private_key1, mnemonic1) = generate_values(input1.0.clone(), input1.1.clone(), input1.2.clone());
        let (private_key2, mnemonic2) = generate_values(input2.0.clone(), input2.1.clone(), input2.2.clone());

        assert_ne!(private_key1, private_key2);
        assert_ne!(mnemonic1, mnemonic2);
    }

    #[test]
    fn test_case_sensitive_same_keys_and_mnemonics() {
        let input = ("housE".to_string(), "Pass1".to_string(), "1234".to_string());

        let (private_key1, mnemonic1) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());
        let (private_key2, mnemonic2) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());

        assert_eq!(private_key1, private_key2);
        assert_eq!(mnemonic1, mnemonic2);
    }

    #[test]
    fn test_empty_strings_produce_valid_keys_and_mnemonics() {
        let input = ("".to_string(), "".to_string(), "".to_string());

        let (private_key1, mnemonic1) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());
        let (private_key2, mnemonic2) = generate_values(input.0.clone(), input.1.clone(), input.2.clone());

        assert_eq!(private_key1, private_key2);
        assert_eq!(mnemonic1, mnemonic2);
        assert_ne!(private_key1, "".to_string());
        assert_ne!(mnemonic1, "".to_string());
    }

    #[test]
    fn test_unicode_characters_produce_different_keys_and_mnemonics() {
        let input1 = ("😃🏠".to_string(), "🔑1".to_string(), "1🐶34".to_string());
        let input2 = ("😺🏠".to_string(), "🔑2".to_string(), "5🐱78".to_string());

        let (private_key1, mnemonic1) = generate_values(input1.0.clone(), input1.1.clone(), input1.2.clone());
        let (private_key2, mnemonic2) = generate_values(input2.0.clone(), input2.1.clone(), input2.2.clone());

        assert_ne!(private_key1, private_key2);
        assert_ne!(mnemonic1, mnemonic2);
    }
    

}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_values])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
