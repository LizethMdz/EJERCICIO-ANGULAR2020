const n = navigator,
  userAgent = n.userAgent;

export const isMobile = {
  android: () => userAgent.match(/Android/i),
  ios: () => userAgent.match(/iPhone|iPad|iPod/i),
  windows: () => userAgent.match(/IEMobile/i),
  any: function () {
    return this.android() || this.ios() || this.windows();
  },
};

export const isDesktop = {
  linux: () => userAgent.match(/linux/i),
  mac: () => userAgent.match(/mac/i),
  windows: () => userAgent.match(/windows nt/i),
  any: function () {
    return this.linux() || this.mac() || this.windows();
  },
};

export const isBrowser = {
  firefox: () => userAgent.match(/firefox/i),
  safari: () => userAgent.match(/safari|(chrome)/i),
  chrome: () => userAgent.match(/chrome/i),
  opera: () => userAgent.match(/opera/i),
  edge: () => userAgent.match(/edge/i),
  ie: () => userAgent.match(/trident/i),
  any: function () {
    return (
      this.firefox() ||
      this.safari() ||
      this.chrome() ||
      this.opera() ||
      this.edge() ||
      this.ie()
    );
  },
};
