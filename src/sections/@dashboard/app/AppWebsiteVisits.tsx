import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import useChart from '@/hook/useChart';
// import { FieldValues } from 'react-hook-form';

// ----------------------------------------------------------------------

// const personWalkingSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 16 16">
//     <path
//       fill="currentColor"
//       d="M9 4.5A1.75 1.75 0 1 0 9 1a1.75 1.75 0 0 0 0 3.5m-2.146.153l-.02-.006a1.1 1.1 0 0 0-.54-.026l-2.456.498a1.1 1.1 0 0 0-.794.647l-.817 1.918A1.1 1.1 0 0 0 4.15 8.732a.687.687 0 0 0 .068-.135l.5-1.28a.5.5 0 0 1 .932.365l-.004.01a.007.007 0 0 0 .002.008a.007.007 0 0 1 .002.008l-.152.386l-.017.044l-2.104 5.36a1.1 1.1 0 1 0 2.047.804l1.173-2.988a.518.518 0 0 1 .364-.297a.513.513 0 0 1 .507.126l.28.298a1 1 0 0 1 .261.542l.299 2.074a1.1 1.1 0 1 0 2.177-.314l-.393-2.729a1.1 1.1 0 0 0-.287-.596L8.634 9.17a.692.692 0 0 1-.181-.571l.016-.117a.474.474 0 0 1 .84-.229l.437.548c.112.14.256.25.42.322l1.795.785a1.1 1.1 0 1 0 .881-2.016l-1.319-.576a1 1 0 0 1-.38-.293l-.886-1.11a1.1 1.1 0 0 0-.533-.365l-.045-.014a1.23 1.23 0 0 0-.462-.042a2.739 2.739 0 0 1-1.951-.608c-.124-.1-.26-.185-.412-.231"
//     />
//   </svg>
// );

// const personFallingSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 512 512">
//     <path
//       fill="currentColor"
//       d="M288 0c17.7 0 32 14.3 32 32v9.8c0 54.6-27.9 104.6-72.5 133.6l.2.3l56.8 80.3H392c15.1 0 29.3 7.1 38.4 19.2l43.2 57.6c10.6 14.1 7.7 34.2-6.4 44.8s-34.2 7.7-44.8-6.4L384 320h-97.4l92.3 142.6c9.6 14.8 5.4 34.6-9.5 44.3s-34.6 5.4-44.3-9.5L164.5 249.2c-2.9 9.2-4.5 19-4.5 29V352c0 17.7-14.3 32-32 32s-32-14.3-32-32v-73.8c0-65.1 39.6-123.7 100.1-147.9c36.2-14.5 59.9-49.5 59.9-88.5V32c0-17.7 14.3-32 32-32M112 32a48 48 0 1 1 0 96a48 48 0 1 1 0-96"
//     />
//   </svg>
// );

// const personArmsUpSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 16 16">
//     <g fill="currentColor">
//       <path d="M8 3a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
//       <path d="m5.93 6.704l-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176c-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" />
//     </g>
//   </svg>
// );

const MIN_VALUE = 0;
const MAX_VALUE = 100;
const LOW_LEVEL_BREAK_POINT = 44;
const HIGH_LEVEL_BREAK_POINT = 75;

interface PlotData {
  x: string;
  y: Array<number> | number | null;
}

interface AppWebsiteVisitsProps extends CardProps {
  title: string;
  subheader?: string;
  chartLabels: string[];
  chartData: {
    name?: string;
    type:
      | 'area'
      | 'line'
      | 'heatmap'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'bubble'
      | 'candlestick'
      | 'boxPlot'
      | 'radar'
      | 'polarArea'
      | 'rangeBar'
      | 'rangeArea'
      | 'treemap'
      | 'column'
      | undefined;
    fill?: string;
    color?: string;
    data: Array<PlotData>;
  }[];
}

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: AppWebsiteVisitsProps) {
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: 1,
        horizontal: false,
        isDumbbell: true,
        dumbbellColors: [['#008FFB', '#00E396']],
      },
    },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'center',
      onItemClick: () => {},
      onItemHover: () => {},
    },
    dataLabels: {
      enabled: true,
      offsetX: 1,
      offsetY: 1,
      formatter() {
        return '　';
      },
    },
    annotations: {
      yaxis: [
        {
          y: HIGH_LEVEL_BREAK_POINT,
          y2: MAX_VALUE,
          borderColor: '#000',
          fillColor: '#ff5630',
          opacity: 0.3,
          label: {
            text: `Danger range ${LOW_LEVEL_BREAK_POINT} - ${MAX_VALUE}`,
            position: 'left',
            offsetX: 118,
          },
        },
        {
          y: LOW_LEVEL_BREAK_POINT,
          y2: MIN_VALUE,
          borderColor: '#000',
          fillColor: '#FEB019',
          label: {
            text: `Danger range ${MIN_VALUE} - ${LOW_LEVEL_BREAK_POINT}`,
            position: 'left',
            offsetX: 108,
          },
        },
      ],
    },
    xaxis: {
      type: 'category',
      offsetX: 0,
      axisBorder: {
        color: '#b6b6b6',
        show: false,
        offsetX: -1,
      },
      axisTicks: {
        show: true,
        color: '#b6b6b6',
      },
      tooltip: {
        enabled: false,
      },
      title: {
        text: 'Cột X',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '18px',
          fontFamily: 'Public sans',
        },
      },
      tickPlacement: 'on',
      tickAmount: 6,
    },
    yaxis: {
      max: MAX_VALUE,
      min: MIN_VALUE,
      tickAmount: 4,
      axisBorder: {
        color: '#b6b6b6',
        show: true,
        offsetX: -1,
      },
      axisTicks: {
        show: true,
        color: '#b6b6b6',
      },
      crosshairs: {
        show: true,
        stroke: {
          color: '#b6b6b6',
          width: 1,
          dashArray: 0,
        },
      },
    },
    grid: {
      xaxis: {
        lines: { show: false },
      },
    },
    tooltip: { enabled: false },
  } as ApexOptions);

  return (
    <Card id="apex-chart-container" {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="rangeBar" series={chartData} options={chartOptions as ApexOptions} width={'100%'} />
      </Box>
    </Card>
  );
}
