{
  description = "Development shell for Tauri + Rust + GTK + WebKitGTK projects";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "akir-tauri-shell";
          # 基本开发工具
          buildInputs = with pkgs; [
            gdk-pixbuf
            pkg-config
            glib
            webkitgtk_4_1
            atk
            libsoup_3
            cairo
            pango
            libayatana-appindicator
          ];

          shellHook = ''
            export PKG_CONFIG_ALLOW_SYSTEM_CFLAGS=1
            export PKG_CONFIG_PATH=${pkgs.gdk-pixbuf.out}/lib/pkgconfig:${pkgs.libsoup_3.out}/lib/pkgconfig:${pkgs.libayatana-appindicator.out}/lib/pkgconfig:$PKG_CONFIG_PATH
            export LD_LIBRARY_PATH=${pkgs.libayatana-appindicator.out}/lib:$LD_LIBRARY_PATH
            RUST_BACKTRACE=1 pnpm run tauri-dev
          '';
        };
      }
    );
}
