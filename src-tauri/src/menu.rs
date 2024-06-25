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
            &PredefinedMenuItem::hide(handle, Some("隐藏"))?,
            &PredefinedMenuItem::hide_others(handle, Some("隐藏其他"))?,
            &PredefinedMenuItem::show_all(handle, Some("显示全部"))?,
            &PredefinedMenuItem::undo(handle, Some("撤销"))?,
            &PredefinedMenuItem::redo(handle, Some("重做"))?,
            &PredefinedMenuItem::cut(handle, Some("剪切"))?,
            &PredefinedMenuItem::copy(handle, Some("拷贝"))?,
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
                .accelerator("CmdOrCtrl+Shift+F12")
                .build(handle)?,
        ])
        .build()?;

    let help_menu = SubmenuBuilder::new(handle, "帮助")
        .items(&[&PredefinedMenuItem::about(handle, Some("关于"), None)?])
        .build()?;

    let menu = MenuBuilder::new(handle).items(&[&file_menu, &editor_menu, &view_menu, &help_menu]);

    handle.set_menu(menu.build()?)?;
    handle.on_menu_event(move |app, event| {
        let win = app.get_webview_window("main").unwrap();
        match event.id().as_ref() {
            "new" => {
                win.emit("new", "").unwrap();
                println!("new action")
            }
            "close_win" => app.get_webview_window("main").unwrap().close().unwrap(),
            "quit" => app.exit(0),
            _ => {
                println!("event id: {:?}", event.id());
            }
        }
    });
    Ok(())
}
