const dimension = {
  width: 800,
  height: 800,
  margin: {
    top: 50,
    left: 50
  }
};

const drawChart = async () => {
  const data = await d3.json('data.json');

  console.log(1, data);
}

drawChart();