{
  description = "Orzklv's web development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [];
        config.allowUnfree = true;
      };
    in {
      # Nix script formatter
      formatter = pkgs.alejandra;

      # Output compiled website
      # nix build ".?submodules=1#" -L
      packages.default = pkgs.runCommand "public" {} ''
        cd ${./.}
        ${pkgs.lib.getExe pkgs.zola} build --drafts -o $out
      '';

      devShells.default = import ./shell.nix {inherit pkgs;};
    });
}
