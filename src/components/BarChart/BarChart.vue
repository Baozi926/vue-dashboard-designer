<template>
  <div class="chart-c">
    <div class="title">{{ title }}</div>
    <div ref="chartEl" class="chart" v-resize="resizeHandler"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useEchart } from "../../hooks/useChart";
import { useDataSource } from "../../hooks/useDataSource";
const chartEl = ref(null);

const props: any = defineProps({
  title: {
    default() {
      return "";
    },
    required: false,
  },
  source: {
    default() {
      return {};
    },
    required: false,
  },
});

const { updateEchart, resizeHandler } = useEchart(chartEl);

useDataSource(
  () => {
    return props.source;
  },
  (result) => {
    var option;

    option = {
      xAxis: {
        type: "category",
        data: result.xAxisData || [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: result.seriesData || [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
      ],
    };
    updateEchart(option);
  }
);
</script>

<style scoped lang="scss">
.chart-c {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .title {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
