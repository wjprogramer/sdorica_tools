class VersionUpdater {

  static isLatestVersion = (versionCode) => {
    if (versionCode) {
      return versionCode >= currentVersionCode;
    } else {
      return false;
    }
  }

  static updateVersion  = async(versionCode) => {
    const scripts = VersionUpdater.versionUpdateScripts;
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.code <= versionCode) {
        continue;
      } else {
        await script.updateVersion();
        ls.setItem("versionCode", script.code);
        ls.setItem("versionName", script.name);
      }
    }
  }

  /**
   * Sample:
   * 
   * ```
   * {
   *    code: 1,
   *    name: "1.0.0",
   *    updateVersion: async() => {
   *        console.log("update to 1.0.0"); 
   *    }
   * }
   * ```
   */
  static versionUpdateScripts = [
  ];

}