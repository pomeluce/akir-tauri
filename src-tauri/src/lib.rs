#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::Manager;
mod menu;

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle();
            menu::setup_menu(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running rapidify-tauri application");
}
