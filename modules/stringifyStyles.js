import CleanCSS from 'clean-css';

export default (criticalStyles) => {
  const cleanCSS = new CleanCSS();
  return cleanCSS.minify(criticalStyles.reduce((result, item) => {
    return result + item[0][1];
  }, ''));
};
