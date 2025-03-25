use tauri::{App, Manager};
use tauri_plugin_global_shortcut::GlobalShortcutExt;

struct MyState {
  value: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
  tauri::Builder::default()
      .manage(MyState {
        value: "Hello, World!".to_string(),
      })
      .setup(|app| {
          let handle = app.handle();
          let shortcut_manager = handle.global_shortcut();
          shortcut_manager.register("Ctrl+Shift+S").expect("Failed to register shortcut");
          Ok(())
      })
      .run(tauri::generate_context!());
  Ok(())
}

