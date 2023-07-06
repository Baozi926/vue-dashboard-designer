export function parseStylesheet(stylesheet: StylesheetItem[]) {

  const styleStr = stylesheet
    .map((v) => {
      return `${v.name}:${v.value}`;
    })
    .join(";");

  return styleStr;
}
