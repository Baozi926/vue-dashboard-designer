<template>
  <div class="weather widget">
    <div class="location">
      {{ location }}
    </div>
    <div>{{ weather }} - {{ tempreture }}℃</div>
  </div>
</template>
<script setup>
import { onMounted, reactive, toRefs } from "vue";
import { useCache } from "../../hooks/useCache";

const apiKey = `SD7wK69510Bck3m2l`;

const url = `https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=beijing&language=zh-Hans&unit=c`;
const { getData } = useCache(
  apiKey,
  () => {
    return fetch(url).then((res) => {
      return res.json().then((json) => {
        return json;
      });
    });
  },
  60 * 60 * 8
);

const data = reactive({
  location: "",
  weather: "N/A",
  tempreture: "N/A",
});

onMounted(async () => {

  const res = await getData();
  const info = res.results[0];

  data.location = info.location.name;

  data.weather = info.now.text;

  data.tempreture = info.now.temperature;
});

const { location, weather, tempreture } = toRefs(data);
</script>
<style scoped lang="scss">
.widget {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .location{
    margin-bottom: 5px;
  }
  // padding: 10px 0;
}
</style>
