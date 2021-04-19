<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="cpuChart.data" :options="defaultOptions" :onRefreshFunction="cpuChart.onRefreshFunction"> </line-chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="memChart.data" :options="defaultOptions" :onRefreshFunction="memChart.onRefreshFunction"> </line-chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <line-chart-card :chartdata="diskChart.data" :options="defaultOptions" :onRefreshFunction="diskChart.onRefreshFunction"> </line-chart-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-cpu">CPU Usage</p>
            <h3 class="title">
              {{ cpuPerCentage }}
              <small>%</small>
            </h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-cpu">CPU Speed</p>
            <h3 class="title">
              {{ cpuSpeed.value }}
              <small>{{ cpuSpeed.unit }}Hz </small>
            </h3>
          </template>
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-mem">Memory Usage</p>
            <h3 class="title">
              {{ memPerCentage }}
              <small>%</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-mem">Memory Free Space</p>
            <h3 class="title">
              {{ memFree.value }}
              <small>{{ memFree.unit }}B</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-disk">Disk Usage</p>
            <h3 class="title">
              {{ diskPerCentage }}
              <small>%</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-16">
        <stats-card class="none-header">
          <template slot="content">
            <p class="category category-disk">Disk Free Space</p>
            <h3 class="title">
              {{ diskFree.value }}
              <small>{{ diskFree.unit }}B</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-custom-100">
        <v-list>
          <v-list-item-group mandatory color="indigo">
            <v-list-item v-for="(item, i) in logs" :key="i">
              <v-list-item-icon>
                <v-icon v-if="item.status === 'BASIC'" class="mr-1">mdi-check</v-icon>
                <v-icon v-else-if="item.status === 'SUCCESS'" class="mr-1 success">mdi-check</v-icon>
                <v-icon v-else class="mr-1 error">mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.message"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <p v-if="isSameDay(item.createdAt)">Just today</p>
                <p v-else v-text="$moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')"></p>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
  import MonitoringService from "../services/MonitoringService";
  import LogSerivce from "../services/LogService";
  import { StatsCard, LineChartCard } from "@/components";

  export default {
    components: {
      StatsCard,
      LineChartCard,
    },
    created() {
      this.updateCpuDataSet(this.cpuChart);
      this.updateMemDataSet(this.memChart);
      this.updateDiskDataSet(this.diskChart);
      this.updateCPUSpeed();
      this.updateMemFreeSpace();
      this.updateDiskFreeSpace();
      this.updateLogs();
    },
    data() {
      return {
        // system monitoring with text
        cpuPerCentage: 0,
        cpuSpeed: {
          value: 0,
          unit: "",
        },
        memPerCentage: 0,
        memFree: {
          value: 0,
          unit: "",
        },
        diskPerCentage: 0,
        diskFree: {
          value: 0,
          unit: "",
        },
        // system monitoring with chart
        defaultOptions: {
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
                realtime: {},
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
        cpuChart: {
          data: {
            datasets: [
              {
                data: [],
                borderColor: "rgb(234, 73, 73)",
                backgroundColor: "rgba(234, 73, 73, 0.4)",
                value: 0,
              },
            ],
          },
        },
        memChart: {
          data: {
            datasets: [
              {
                data: [],
                borderColor: "rgb(138, 92, 126)",
                backgroundColor: "rgba(138, 92, 126, 0.4)",
                value: 0,
              },
            ],
          },
        },
        diskChart: {
          data: {
            datasets: [
              {
                data: [],
                borderColor: "rgb(102, 179, 117)",
                backgroundColor: "rgba(102, 179, 117, 0.4)",
                value: 0,
              },
            ],
          },
        },
        // log monitoirng
        logs: [],
      };
    },
    methods: {
      updateCpuDataSet: function(chart) {
        setInterval(
          function() {
            MonitoringService.getCPUUsage()
              .then((res) => {
                const cpu = res.data;
                this.cpuPerCentage = cpu.toFixed(4);
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
          }.bind(this),
          1000
        );
      },
      updateMemDataSet: function(chart) {
        setInterval(
          function() {
            MonitoringService.getMemoryUsage()
              .then((res) => {
                const mem = res.data;
                this.memPerCentage = mem.toFixed(4);
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
          }.bind(this),
          1000
        );
      },
      updateDiskDataSet: function(chart) {
        setInterval(
          function() {
            MonitoringService.getDiskUsage()
              .then((res) => {
                const disk = res.data;
                this.diskPerCentage = disk.toFixed(4);
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
          }.bind(this),
          1000
        );
      },
      updateCPUSpeed: function() {
        setInterval(
          function() {
            MonitoringService.getCPUSpeed()
              .then((res) => {
                const speed = res.data;
                this.cpuSpeed = {
                  value: speed.value,
                  unit: speed.unit,
                };
              })
              .catch((e) => {
                console.log(e);
              });
          }.bind(this),
          1000
        );
      },
      updateMemFreeSpace: function() {
        setInterval(
          function() {
            MonitoringService.getMemoryFreeSpace()
              .then((res) => {
                const free = res.data;
                this.memFree = {
                  value: free.value,
                  unit: free.unit,
                };
              })
              .catch((e) => {
                console.log(e);
              });
          }.bind(this),
          1000
        );
      },
      updateDiskFreeSpace: function() {
        setInterval(
          function() {
            MonitoringService.getDiskFreeSpace()
              .then((res) => {
                const free = res.data;
                this.diskFree = {
                  value: free.value,
                  unit: free.unit,
                };
              })
              .catch((e) => {
                console.log(e);
              });
          }.bind(this),
          1000
        );
      },
      updateLogs() {
        this.getLogs();
        setInterval(
          function() {
            this.getLogs();
          }.bind(this),
          10000
        );
      },
      getLogs() {
        LogSerivce.getAll()
          .then((res) => {
            this.logs = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      isSameDay(createdAt) {
        const createdDay = new Date(createdAt).getDay();
        const toDay = new Date().getDay();
        return createdDay === toDay;
      },
    },
  };
</script>

<style scoped>
  .md-layout-item.md-size-custom-16 {
    min-width: 16.6%;
    max-width: 16.6%;
  }
  .category-cpu {
    color: #ea4949 !important;
  }
  .category-mem {
    color: #8a5c7e !important;
  }
  .category-disk {
    color: #66b375 !important;
  }
</style>

<style>
  .md-card-stats.none-header .md-card-header {
    display: none;
  }
  .v-list-item__action {
    height: 20px;
  }
  .v-icon.success {
    color: green !important;
  }
  .v-icon.error {
    color: red !important;
  }
</style>
