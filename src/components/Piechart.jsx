import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Pie(list){
      const options = {
    chart: {
      type: 'pie',
      width: 600,
      height: 300,
      backgroundColor: null
    },
    title: {
      text: '',
      style: {
        color: '#FFF'
      }
    },
    series: [{
      name: 'Consultas', 
      colorByPoint: true, 
      data: pieData || [], 
    }],
    credits: {
      enabled: false
    }
  };
    return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}


export default Pie