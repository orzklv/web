{
  description = "Orzklv's web development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    # nixpkgs.url = "github:NixOS/nixpkgs/23.11";

    utils.url = "github:numtide/flake-utils";
  };

    outputs = { self, nixpkgs, ... }@inputs: inputs.utils.lib.eachSystem [
    "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"
  ] (system: let
    pkgs = import nixpkgs {
      inherit system;

      overlays = [];

      # config.allowUnfree = true;
    };
  in {
    devShells.default = pkgs.mkShell rec {
      name = "web";

      packages = with pkgs; [
        zola
        lolcat
        figlet
      ];

      shellHook = let
        icon = "f121";
      in ''
        export PS1="$(echo -e '\u${icon}') {\[$(tput sgr0)\]\[\033[38;5;228m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\]} (${name}) \\$ \[$(tput sgr0)\]"

        figlet -f slant "${name}" | lolcat
        printf "\n\n"
        zola serve &
        SERVER_PID=$!

        finish()
        {
          printf "\nTime to say goodbye, Nya!\n" | lolcat
          kill $SERVER_PID
        }

        trap finish EXIT
      '';
    };
  });
}
