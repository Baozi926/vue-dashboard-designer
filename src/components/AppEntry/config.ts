export default {
  name: "AppEntry",
  alias: "app快捷入口",
  width: 2,
  height: 2,
  properties: [
    {
      name: "title",
      alias: "应用名称",
      value: "我的应用",
    },
    {
      name: "icon",
      alias: "图标",
      value:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP0SURBVHgB7d2BcdowFMbxRydoN6ATNCOQCUI3SCdoNkgyQdMJ2m7QDWADsgF0gmSDV72z79rjCNhYEpLe/3eno5dyBPw+ZFuRbBEAAAAAAAAAAAAAANCamWSmqovwcBPaMrS5wDz37XE2m+0ko2wBCIV/Hx7uQ7sTHPMkXRBeJYMsAeiLvwrtSjCE9QbXOULwTvKwbz7FH8621b1kkLwHCN/+eXjYCs5hvcBaEsrRA2RJcqOWkliOAND1n+9GEsuxC1DB2cIuIGmNch0EolAEwDkC4BwBcI4AOEcAnCMAzhEA5wiAcwTAOQLgHAFwjgA4RwCcIwDOEQDnCEAau9CuQ/vQT+j43P+sOMwIiu/glO5+avxGRi6GYUZQXd6cz9//7IsUhh4gnpOLOfpe4EVGSN0DEIA4Bq/kGbs92AWUb0zxk8/zH4seYJoxxecgsDFji2+LY+dSGAJwnnOKX+QKKQIwXjPFNwRgnKaKbwjAcM0V39QSgJ1cdmy9yeJnodNt+426/7rvQ9toeptDv/+Nzxr9PUntdLrlkddOHYKLFt9IYsUPBJ0aCNF0XW4R3b77gaBT38C+QHZ88CzxuNnn13AQeHLDRg4BB3wx6XRbzbcfvvg+f5/UTuPIUZjiim+kdhpPygIVWXwjtdO4UhSq2OIbqZ3GF7NgRRffSO00jRiFK774Rmqn6UwpYBXFN5JY7VPCzjlnF6noPJ9ZwaeNDYHUNMhDAIYZHIIhSim+YVLoMFaolQ7crx9TUvFzaGlG0OQQeCu+aW1K2Nkh8Fh80+KcwNEh8Fp80+qkUCuknbvPTz2xf47bP+m2PCt4Ll1PcHcoCNoN8Nj9jGy5lsviG09rA9ehvfbtSiopOuMAzjEOgKQIgHMEwDkC4BwBcI4AOEcAnCMAzhEA5wiAcwTAOQLgHAFwjgA4RwCcIwDOEQDnCIBzBMA57wHYSaG3c8vFYwDW8u+6wx+t2b+lu/7wL3HG27Twx1Dw9bEnhbdr08W/hbaQAjAreLq1dEvHr08V34TnPNtzpbvH304wjV7OViPcpSu8xm3/WhchtdP8XkK7k8j0QkGQxFo6BrAlX99De4p1pZBD+nB9lUx3AGNp2GlZCv8/7Rab3koXhMlXJTkmdQCS67vkFOx1HzTCZWEmfLZ5aD81IamdprnG3g8dsPY/F00XhI3UTrtvaSwr7c7Ti6Txg/AktdPuQgxTdwOr0BZSCe2CsNJpbJvNpQXaXaWj+cLvC+99qeefOkY/lb0oHbcr2NZc+H06fgzhQVo0YEPY/91KowZ+/smjl2Nc5Byz/5CL0D5Jdx7/J7TfQ8bqW+D98wMAAAAAAAAAAAAAACChv+4nqzu/f9JfAAAAAElFTkSuQmCC",
    },
    {
      name: "url",
      alias: "应用地址",
      value: "",
    },
  ],
  stylesheet: [
    {
      name: "--appcolor",
      value:
        "linear-gradient(0deg, rgba(66, 165, 246, 1) 0%, rgba(156, 40, 177, 1) 98%)",
      alias: "app颜色",
      editor: "GradientColorEditor",
    },
  ],
} as MyComponent;
