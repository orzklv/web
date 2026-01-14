{ pkgs, ... }:
pkgs.mkShell rec {
  packages = with pkgs; [
    nixd
    nixfmt
    statix
    deadnix

    zola
    taplo
  ];
}
