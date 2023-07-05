<template>
  <div ref="chartEl" class="chart" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useEchart } from "../../hooks/useChart";
import { useDataSource } from "../../hooks/useDataSource";
const chartEl = ref<ElRef>(null);

const props: any = defineProps({
  title: {
    default() {
      return "title:";
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

useDataSource(props.source, (result) => {
  var option;

  option = {
    xAxis: {
      type: "category",
      data: result.value.xAxisData || [
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
        data: result.value.seriesData || [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  updateEchart(option);
});
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
