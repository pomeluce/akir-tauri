#[cfg_attr(mobile, tauri::mobile_entry_point)]
use std::fs::create_dir_all;
use tauri::{AppHandle, Manager, WindowEvent};
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
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            command::app::set_decorations,
            command::app::get_decorations,
            command::devtools::toggle_devtools
        ])
        .setup(|app| {
            let app_handle = app.app_handle();

            // 创建数据库文件夹
            create_database(app_handle);
            // 更改窗口关闭行为
            window_close_event(app_handle);
            // 添加托盘图标
            menu::tray::setup_tray(app_handle)?;

            Ok(())
        })
        .run(ctx)
        .expect("error while running akir-tauri application");
}

/* 数据库目录创建事件 */
fn create_database(handle: &AppHandle) {
    let app_dir = handle.path().app_config_dir().unwrap();
    if let Err(e) = create_dir_all(app_dir.join("Databases")) {
        println!("Failed to create Databases directory: {:?}", e);
    }
}

fn window_close_event(handle: &AppHandle) {
    let window = handle.get_webview_window("main").unwrap();
    let window_clone = window.clone();

    window_clone.on_window_event(move |event| {
        if let WindowEvent::CloseRequested { api, .. } = event {
            // 阻止窗口默认事件
            api.prevent_close();
            // 设置窗口隐藏
            window.hide().unwrap();
        }
    });
}
