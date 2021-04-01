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
    },
    mounted() {
      this.renderChart(this.chartdata, this.options);
    },
  };
</script>
