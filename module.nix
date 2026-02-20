flake:
{
  config,
  lib,
  pkgs,
  ...
}:
let
  # Options
  cfg = config.services.orzklv-website;
in
{
  # Available user options
  options = with lib; {
    services.orzklv-website = {
      enable = mkEnableOption "Deploy orzklv's website.";

      domain = mkOption {
        type = types.str;
        default = "127.0.0.1";
        description = "Domain name to host the website.";
      };

      package = mkOption {
        type = types.package;
        default = flake.packages.${pkgs.stdenv.hostPlatform.system}.default;
        description = "Packaged version of orzklv's website.";
      };
    };
  };

  config = lib.mkIf cfg.enable {
    services.nginx.virtualHosts =
      lib.debug.traceIf (isNull cfg.domain) "domain can't be null, please specicy it properly!"
        {
          "${cfg.domain}" = {
            addSSL = true;
            enableACME = true;
            root = cfg.package;
          };
        };
  };
}
