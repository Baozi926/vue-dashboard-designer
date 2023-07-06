import Mock from "mockjs";
import { mockFetch } from "mockjs-fetch";

mockFetch(Mock);



Mock.mock(/testMockFetch\.json/, {
  num: Mock.Random.integer(0, 100),
});

let resp = await fetch("/api/testMockFetch.json").then((resp) => resp.json());
console.log("输出结果：", resp);
