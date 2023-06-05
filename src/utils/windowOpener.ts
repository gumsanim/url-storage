/* URL과 target을 받아 새 창을 열어주는 함수입니다. */

const windowOpener = (url: string, target = "_blank") => {
  window.open(url, target);
};

export default windowOpener;
