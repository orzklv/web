{
  description = "Orzklv's web development environment";

  inputs = {
    # Nixpkgs
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    # Flake-parts utilities
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    { flake-parts, ... }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } (
      { ... }:
      {
        systems = [
          "x86_64-linux"
          "aarch64-linux"
          "aarch64-darwin"
        ];
        perSystem =
          { pkgs, ... }:
          {
            # Formatter for your nix files, available through 'nix fmt'
            formatter = pkgs.nixfmt-tree;

            # Output compiled website
            # nix build ".?submodules=1#" -L
            packages.default = pkgs.callPackage ./. { };
            # pkgs.runCommand "public" { } ''
            #   cd ${./.}
            #   ${pkgs.lib.getExe pkgs.zola} build --drafts -o $out
            # '';

            # Development shells
            devShells.default = import ./shell.nix { inherit pkgs; };
          };
      }
    );

}
