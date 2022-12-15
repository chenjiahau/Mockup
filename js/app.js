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

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimension.width)
    .attr('height', dimension.height);

  const apparentTemperatureList = [];
  const humidityList = [];

  for (let d of data) {
    apparentTemperatureList.push(d.currently.apparentTemperature);
    humidityList.push(d.currently.humidity);
  }

  // ctr === container
  const ctr = svg.append('g')
    .attr('transform', `translate(${dimension.margin.top}, ${dimension.margin.left})`);

  const xScale = d3.scaleLinear()
    .domain([d3.min(humidityList), d3.max(humidityList)])
    .range([0, dimension.width - dimension.margin.left * 2]);

  const yAccessor = d => d.currently.apparentTemperature;
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([0, dimension.width - dimension.margin.top * 2]);

  ctr
    .selectAll('circle') // 沒有selectAll會append到body外？用select也不行
    .data(data)
    .join('circle')
    .attr('cx', d => xScale(d.currently.humidity)) // 把value丟給xScale，mapping到document上相對的位置
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 10)
    .attr('fill', '#ff0000')
}

drawChart()