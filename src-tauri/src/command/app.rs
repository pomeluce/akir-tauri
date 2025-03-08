use tauri::Manager;

#[tauri::command]
pub fn set_decorations(app_handle: tauri::AppHandle, show: bool) {
    let app = app_handle.get_webview_window("main").unwrap();
    let result = app.set_decorations(show);

    match result {
        Ok(()) => (),
        Err(e) => panic!("set_decorations failed: {}", e),
    }
}

#[tauri::command]
pub fn get_decorations(app_handle: tauri::AppHandle) -> Result<bool, tauri::Error> {
    let app = app_handle.get_webview_window("main").unwrap();
    app.is_decorated()
}
