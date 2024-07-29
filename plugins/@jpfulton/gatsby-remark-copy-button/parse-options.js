export default (language => {
  if (!language) {
    return {
      splitLanguage: ""
    };
  }
  if (language.split(`{`).length > 1) {
    const [splitLanguage, ...options] = language.split(`{`);
    let clipboardButton = false;
    options.forEach(option => {
      option = option.slice(0, -1);
      const splitOption = option.replace(/ /g, ``).split(`:`);
      // Option must look like `clipboardButton: true`
      if (splitOption.length === 2 && splitOption[0] === `clipboardButton` && splitOption[1].trim() === `true`) {
        clipboardButton = true;
      }
    });
    return {
      splitLanguage,
      clipboardButton
    };
  }
  return {
    splitLanguage: language
  };
});