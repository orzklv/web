{ pkgs, ... }:
pkgs.stdenv.mkDerivation {
  pname = "orzklv-web";
  version = "0.0.1";

  src = pkgs.lib.cleanSource ./.;

  nativeBuildInputs = with pkgs; [ zola ];

  buildPhase = ''

  '';
}
