use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
use tauri::AppHandle;

pub fn setup_menu(handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let file_menu = SubmenuBuilder::new(handle, "文件")
        .items(&[
            &MenuItemBuilder::new("新建")
                .id("new")
                .accelerator("Ctrl+N")
                .build(handle)?,
            &PredefinedMenuItem::close_window(handle, Some("关闭窗口"))?,
            &PredefinedMenuItem::quit(handle, Some("退出"))?,
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
            &PredefinedMenuItem::fullscreen(handle, Some("切换全屏"))?,
            &PredefinedMenuItem::minimize(handle, Some("最小化"))?,
            &PredefinedMenuItem::maximize(handle, Some("最大化"))?,
        ])
        .build()?;

    let help_menu = SubmenuBuilder::new(handle, "帮助")
        .items(&[
            &PredefinedMenuItem::services(handle, Some("服务"))?,
            &PredefinedMenuItem::about(handle, Some("关于"), None)?,
        ])
        .build()?;

    let menu = MenuBuilder::new(handle).items(&[&file_menu, &editor_menu, &view_menu, &help_menu]);

    handle.set_menu(menu.build()?)?;
    handle.on_menu_event(move |_app, event| {
        if event.id() == "new" {
            println!("event id: {:?}", event.id());
        }
    });
    Ok(())
}
