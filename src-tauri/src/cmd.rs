#[tauri::command]
pub fn toggle_menu(app_handle: tauri::AppHandle, visible: bool) {
    println!("visible: {}", visible);
    if visible {
        app_handle.show_menu().unwrap();
    } else {
        app_handle.hide_menu().unwrap();
    }
}
