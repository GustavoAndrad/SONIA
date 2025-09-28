import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


interface LineProps {
  data: {
    seriesNames: string[];   // nomes das séries, ex: ["Usina A", "Usina B"]
    labels: string[];        // categorias do eixo X, ex: ["Jan", "Fev"]
    values: number[][];      // array de arrays: cada subarray = dados da série correspondente
  };
}

function Line({ data }: LineProps) {
   const series = data.seriesNames.map((name, i) => ({
    name,
    data: data.values[i],
  }));
  const options = {
    chart: {
      type: 'line', 
      
      backgroundColor: null
    },
    title: {
      text: '',
      style: {
        color: '#FFF'
      }
    },
    xAxis: { categories: data.labels },
    yAxis: { title: { text: '' } },
    series: series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default Line;
