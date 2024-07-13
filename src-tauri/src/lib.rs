#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

mod command;
mod menu;

pub fn run() {
    let mut ctx = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec![/* 传递参数 */ ]),
        ))
        .plugin(tauri_plugin_os::init())
        .invoke_handler(tauri::generate_handler![command::devtools::toggle_devtools])
        .setup(|app| {
            let app_handle = app.app_handle();
            menu::tray::setup_tray(app_handle)?;

            Ok(())
        })
        .run(ctx)
        .expect("error while running rapidify-tauri application");
}
