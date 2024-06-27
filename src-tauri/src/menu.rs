use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
use tauri::{AppHandle, Manager};

pub fn setup_menu(handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let file_menu = SubmenuBuilder::new(handle, "文件")
        .items(&[
            &MenuItemBuilder::new("新建")
                .id("new")
                .accelerator("CmdOrCtrl+N")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("打开")
                .id("open")
                .accelerator("CmdOrCtrl+O")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("偏好设置")
                .id("preferences")
                .accelerator("CmdOrCtrl+,")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("关闭窗口")
                .id("close_win")
                .accelerator("Alt+F4")
                .build(handle)?,
            &MenuItemBuilder::new("退出")
                .id("quit")
                .accelerator("CmdOrCtrl+Q")
                .build(handle)?,
        ])
        .build()?;
    let editor_menu = SubmenuBuilder::new(handle, "编辑")
        .items(&[
            &PredefinedMenuItem::copy(handle, Some("复制"))?,
            &PredefinedMenuItem::cut(handle, Some("剪切"))?,
            &PredefinedMenuItem::paste(handle, Some("粘贴"))?,
            &PredefinedMenuItem::select_all(handle, Some("全选"))?,
        ])
        .build()?;

    let view_menu = SubmenuBuilder::new(handle, "视图")
        .items(&[
            &MenuItemBuilder::new("切换全屏")
                .id("fullscreen")
                .accelerator("F11")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("开发者工具")
                .id("devtools")
                .accelerator("Shift+F12")
                .build(handle)?,
        ])
        .build()?;

    let theme_menu = SubmenuBuilder::new(handle, "主题")
        .items(&[
            &MenuItemBuilder::new("系统默认")
                .id("system_theme")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("亮色主题")
                .id("light_theme")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &MenuItemBuilder::new("深色主题")
                .id("dark_theme")
                .build(handle)?,
        ])
        .build()?;

    let help_menu = SubmenuBuilder::new(handle, "帮助")
        .items(&[&MenuItemBuilder::new("关于").id("about").build(handle)?])
        .build()?;

    let menu = MenuBuilder::new(handle).items(&[
        &file_menu,
        &editor_menu,
        &view_menu,
        &theme_menu,
        &help_menu,
    ]);

    handle.set_menu(menu.build()?)?;
    handle.on_menu_event(move |app, event| {
        let win = app.get_webview_window("main").unwrap();
        match event.id().as_ref() {
            "new" => win.emit("new", "").unwrap(),
            "open" => win.emit("open", "").unwrap(),
            "preferences" => win.emit("settings", "").unwrap(),
            "close_win" => app.get_webview_window("main").unwrap().close().unwrap(),
            "quit" => app.exit(0),
            "fullscreen" => {
                let is_full = win.is_fullscreen().unwrap();
                win.set_fullscreen(!is_full).unwrap();
            }
            "devtools" => {
                if win.is_devtools_open() {
                    win.close_devtools();
                } else {
                    win.open_devtools();
                }
            }
            "system_theme" => win.emit("system_theme", "").unwrap(),
            "light_theme" => win.emit("light_theme", "").unwrap(),
            "dark_theme" => win.emit("dark_theme", "").unwrap(),
            "about" => {
                win.emit("about", "").unwrap();
            }
            _ => {
                println!("event id: {:?}", event.id());
            }
        }
    });
    Ok(())
}
