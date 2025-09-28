import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Line(x,y){
      const options = {
    chart: {
      type: 'Line',
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
    series: [x,y]
  };
    return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}


export default Line