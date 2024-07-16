use std::fs::create_dir_all;

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
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![command::devtools::toggle_devtools])
        .setup(|app| {
            let app_handle = app.app_handle();

            // 创建数据库文件夹
            let app_dir = app_handle.path().app_config_dir().unwrap();
            if let Err(e) = create_dir_all(app_dir.join("Databases")) {
                println!("Failed to create Databases directory: {:?}", e);
            }

            // #[cfg(any(target_os = "windows", target_os = "linux"))]
            menu::tray::setup_tray(app_handle)?;

            Ok(())
        })
        .run(ctx)
        .expect("error while running rapidify-tauri application");
}
