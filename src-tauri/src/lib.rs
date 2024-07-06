#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::Manager;
mod menu;

pub fn run() {
    let mut ctx = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .setup(|app| {
            let app_handle = app.app_handle();
            menu::setup_menu(app_handle)?;

            Ok(())
        })
        .run(ctx)
        .expect("error while running rapidify-tauri application");
}
