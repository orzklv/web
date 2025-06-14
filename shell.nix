{pkgs, ...}:
pkgs.mkShell rec {
  name = "webnya";

  packages = with pkgs; [
    # Hail Nix
    nixd
    alejandra
    statix
    deadnix

    # Zola
    zola
  ];
}
