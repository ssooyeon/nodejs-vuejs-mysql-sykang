<script>
  import { Line } from "vue-chartjs";
  import "chartjs-plugin-streaming";

  export default {
    name: "line-chart-card",
    extends: Line,
    props: {
      chartdata: {
        type: Object,
        default: null,
      },
      options: {
        type: Object,
        default: null,
      },
      onRefreshFunction: {
        type: Function,
        default: null,
      },
    },
    mounted() {
      this.options.scales.xAxes[0].realtime.onRefresh = this.onRefreshFunction;
      this.renderChart(this.chartdata, this.options);
    },
  };
</script>
