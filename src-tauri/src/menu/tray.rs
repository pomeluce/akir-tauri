use tauri::{
    image::Image,
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
};
use tauri::{AppHandle, Manager};

pub fn setup_tray(app_handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let win = app_handle.get_webview_window("main").unwrap();
    let menu = MenuBuilder::new(app_handle)
        .items(&[
            &MenuItemBuilder::with_id("show_app", "界面").build(app_handle)?,
            &MenuItemBuilder::with_id("exit_app", "退出").build(app_handle)?,
        ])
        .build()?;
    let tray = TrayIconBuilder::new().menu(&menu).build(app_handle)?;

    tray.set_icon(Some(Image::from_path("./icons/icon.png")?))?;

    tray.on_menu_event(move |app, event| match event.id().as_ref() {
        "show_app" => win.show().unwrap(),
        "exit_app" => app.exit(0),
        _ => {
            println!("menu event: {:?}", event.id());
        }
    });

    tray.on_tray_icon_event(|tray, event| {
        if let TrayIconEvent::Click {
            button: MouseButton::Left,
            button_state: MouseButtonState::Up,
            ..
        } = event
        {
            let app = tray.app_handle();
            if let Some(webview_window) = app.get_webview_window("main") {
                let _ = webview_window.show();
                let _ = webview_window.set_focus();
            }
        }
    });
    Ok(())
}
