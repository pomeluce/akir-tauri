// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod menu;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle();
            menu::setup_menu(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running rapidify-tauri application");
}
