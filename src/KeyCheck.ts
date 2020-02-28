const rightKeys = ["Right", "ArrowRight"].concat("67890-=yuiop[]hjkl;'#nmm,./".split(""));
const leftKeys = ["Left","ArrowLeft"].concat("12345qwertasdfg\\zxcvb".split(""));

export const KeyCheck = {
  RightPress: (event: KeyboardEvent) => {
    return rightKeys.some(k => event.key === k);
  },
  LeftPress: (event: KeyboardEvent) => {
    return leftKeys.some(k => event.key === k);
  }
}