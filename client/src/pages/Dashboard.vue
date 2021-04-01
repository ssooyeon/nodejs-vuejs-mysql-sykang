<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="cpuChart.data" :options="cpuChart.options" data-background-color="blue"> </line-chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="memChart.data" :options="memChart.options" data-background-color="blue"> </line-chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="diskChart.data" :options="diskChart.options" data-background-color="blue"> </line-chart-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>
          <template slot="content">
            <p class="category">Usage</p>
            <h3 class="title">
              34.33
              <small>%</small>
            </h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Lastest: 2021-04-01 17:47:12
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>
          <template slot="content">
            <p class="category">Speed</p>
            <h3 class="title">
              5.42
              <small>GB</small>
            </h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a>
            </div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Fixed Issues</p>
            <h3 class="title">75</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              Tracked from Github
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fab fa-twitter"></i>
          </template>

          <template slot="content">
            <p class="category">Folowers</p>
            <h3 class="title">+245</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
    </div>
  </div>
</template>

<script>
  import MonitoringService from "../services/MonitoringService";
  import { StatsCard, LineChartCard } from "@/components";

  export default {
    components: {
      StatsCard,
      LineChartCard,
    },
    data() {
      return {
        cpuChart: {
          data: {
            datasets: [
              {
                data: [],
                // borderColor: "rgb(234, 73, 73)",
                // backgroundColor: "rgba(234, 73, 73, 0.4)",
                value: 0,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            events: ["click"],
            plugins: {
              datalabels: {
                display: false,
              },
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "second",
                    displayFormats: {
                      second: "HH:mm:ss",
                    },
                  },
                  realtime: {
                    onRefresh: function(chart) {
                      MonitoringService.getCPU()
                        .then((res) => {
                          const cpu = res.data;
                          chart.data.datasets.forEach(function(dataset) {
                            dataset.data.push({
                              x: Date.now(),
                              y: cpu,
                            });
                          });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    },
                  },
                  barPercentage: 0.5,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 20,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        },

        memChart: {
          data: {
            datasets: [
              {
                data: [],
                // borderColor: "rgb(234, 73, 73)",
                // backgroundColor: "rgba(234, 73, 73, 0.4)",
                value: 0,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            events: ["click"],
            plugins: {
              datalabels: {
                display: false,
              },
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "second",
                    displayFormats: {
                      second: "HH:mm:ss",
                    },
                  },
                  realtime: {
                    onRefresh: function(chart) {
                      MonitoringService.getMemory()
                        .then((res) => {
                          const mem = res.data;
                          chart.data.datasets.forEach(function(dataset) {
                            dataset.data.push({
                              x: Date.now(),
                              y: mem,
                            });
                          });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    },
                  },
                  barPercentage: 0.5,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 20,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        },
        diskChart: {
          data: {
            datasets: [
              {
                data: [],
                // borderColor: "rgb(234, 73, 73)",
                // backgroundColor: "rgba(234, 73, 73, 0.4)",
                value: 0,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            events: ["click"],
            plugins: {
              datalabels: {
                display: false,
              },
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "second",
                    displayFormats: {
                      second: "HH:mm:ss",
                    },
                  },
                  realtime: {
                    onRefresh: function(chart) {
                      MonitoringService.getDisk()
                        .then((res) => {
                          const disk = res.data;
                          chart.data.datasets.forEach(function(dataset) {
                            dataset.data.push({
                              x: Date.now(),
                              y: disk,
                            });
                          });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    },
                  },
                  barPercentage: 0.5,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 20,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          },
        },
      };
    },
    methods: {},
  };
</script>
