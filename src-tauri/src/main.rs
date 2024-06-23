// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod menu;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.app_handle();
            match menu::setup_menu(handle) {
                Ok(()) => {}
                Err(err) => println!("Failed to setup menu: {:?}", err),
            };
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running rapidify-tauri application");
}
