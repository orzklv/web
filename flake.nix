{
  description = "Orzklv's web development environment";

  inputs = {
    # Nixpkgs
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    # Flake-parts utilities
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    { self, flake-parts, ... }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } (
      { ... }:
      {
        systems = [
          "x86_64-linux"
          "aarch64-linux"
          "aarch64-darwin"
        ];
        flake = {
          # NixOS module (deployment)
          nixosModules.static = import ./module.nix self;
        };
        perSystem =
          { pkgs, ... }:
          {
            # Formatter for your nix files, available through 'nix fmt'
            formatter = pkgs.nixfmt-tree;

            # Output compiled website
            packages.default = pkgs.callPackage ./. { };

            # Development shells
            devShells.default = import ./shell.nix { inherit pkgs; };
          };
      }
    );

}
