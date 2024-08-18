{
  description = "Orzklv's web development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    # nixpkgs.url = "github:NixOS/nixpkgs/24.05";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... } @ inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ ];
          config.allowUnfree = true;
        };
      in
      {
        # Nix script formatter
        formatter = pkgs.nixpkgs-fmt;

        devShells.default = pkgs.mkShell rec {
          name = "webnya";

          packages = with pkgs; [
            zola
            lolcat
            figlet
          ];

          shellHook =
            let
              icon = "f121";
            in
            ''
              export PS1="$(echo -e '\u${icon}') {\[$(tput sgr0)\]\[\033[38;5;228m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\]} (${name}) \\$ \[$(tput sgr0)\]"

              # Show some nyanny text
              figlet -f slant "${name}" | lolcat
              printf "\n\n"

              # Check if the blog repo exists
              # If not, clone it from GitHub
              if [ ! -d ../blog ]; then
                git clone https://github.com/orzklv/blog.git ../blog
              fi

              # Symlink contents to blog repo
              ln -s ../blog/content ./content

              zola serve &
              SERVER_PID=$!

              finish()
              {
                printf "\nTime to say goodbye, Nya!\n" | lolcat

                # Kill the server
                kill $SERVER_PID

                # Remove symlink
                rm ./content
              }

              trap finish EXIT
            '';
        };
      });
}
