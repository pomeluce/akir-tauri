use serde_json::Value;
use tauri::menu::{
    CheckMenuItemBuilder, MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder,
};
use tauri::{AppHandle, Manager};

pub fn setup_menu(handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let win = handle.get_webview_window("main").unwrap();

    let file_submenu = SubmenuBuilder::new(handle, "文件")
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
    let editor_submenu = SubmenuBuilder::new(handle, "编辑")
        .items(&[
            &PredefinedMenuItem::copy(handle, Some("复制"))?,
            &PredefinedMenuItem::cut(handle, Some("剪切"))?,
            &PredefinedMenuItem::paste(handle, Some("粘贴"))?,
            &PredefinedMenuItem::select_all(handle, Some("全选"))?,
        ])
        .build()?;

    let devtools_menu = CheckMenuItemBuilder::new("开发者工具")
        .id("devtools")
        .accelerator("Shift+F12")
        .checked(false)
        .build(handle)?;

    let view_submenu = SubmenuBuilder::new(handle, "视图")
        .items(&[
            &MenuItemBuilder::new("切换全屏")
                .id("fullscreen")
                .accelerator("F11")
                .build(handle)?,
            &PredefinedMenuItem::separator(handle)?,
            &devtools_menu,
        ])
        .build()?;

    let system_theme_menu = CheckMenuItemBuilder::new("跟随系统")
        .id("system_theme")
        .build(handle)?;
    let light_theme_menu = CheckMenuItemBuilder::new("亮色主题")
        .id("light_theme")
        .build(handle)?;
    let dark_theme_menu = CheckMenuItemBuilder::new("深色主题")
        .id("dark_theme")
        .build(handle)?;

    let theme_submenu = SubmenuBuilder::new(handle, "主题")
        .items(&[
            &system_theme_menu,
            &PredefinedMenuItem::separator(handle)?,
            &light_theme_menu,
            &PredefinedMenuItem::separator(handle)?,
            &dark_theme_menu,
        ])
        .build()?;

    let help_menu = SubmenuBuilder::new(handle, "帮助")
        .items(&[&MenuItemBuilder::new("关于").id("about").build(handle)?])
        .build()?;

    let menu = MenuBuilder::new(handle).items(&[
        &file_submenu,
        &editor_submenu,
        &view_submenu,
        &theme_submenu,
        &help_menu,
    ]);

    win.listen("current_theme", move |event| {
        if let Ok(payload) = serde_json::from_str::<Value>(event.payload()) {
            system_theme_menu.set_checked(payload.eq("system")).unwrap();
            light_theme_menu.set_checked(payload.eq("light")).unwrap();
            dark_theme_menu.set_checked(payload.eq("dark")).unwrap();
        }
    });

    handle.set_menu(menu.build()?)?;
    handle.on_menu_event(move |_app, event| match event.id().as_ref() {
        "new" => win.emit("new", "").unwrap(),
        "open" => win.emit("open", "").unwrap(),
        "close_win" => win.close().unwrap(),
        "quit" => win.hide().unwrap(),
        "fullscreen" => {
            let is_full = win.is_fullscreen().unwrap();
            win.set_fullscreen(!is_full).unwrap();
        }
        "devtools" => {
            if win.is_devtools_open() {
                win.close_devtools();
                devtools_menu.set_checked(false).unwrap();
            } else {
                win.open_devtools();
                devtools_menu.set_checked(true).unwrap();
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
    });
    Ok(())
}
