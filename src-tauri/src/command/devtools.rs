use tauri::Manager;

#[tauri::command]
pub async fn toggle_devtools(app_handle: tauri::AppHandle) {
    let win = app_handle.get_webview_window("main").unwrap();
    if win.is_devtools_open() {
        win.close_devtools()
    } else {
        win.open_devtools()
    }
}
