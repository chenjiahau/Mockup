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

  // Draw a svg
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

  // Draw a container(ctr === container)
  const ctr = svg.append('g')
    .attr('transform', `translate(${dimension.margin.top}, ${dimension.margin.left})`);

  const xScale = d3.scaleLinear()
    // .domain([d3.min(humidityList), d3.max(humidityList)])
    .domain([0, d3.max(humidityList)])
    .range([0, dimension.width - dimension.margin.left * 2]);

  const yAccessor = d => d.currently.apparentTemperature;
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    // .range([0, dimension.width - dimension.margin.top * 2]);
    .domain([0, d3.max(apparentTemperatureList)])
    .range([dimension.width - dimension.margin.top * 2, 0]);

  // Draw circles inside the container
  ctr
    .selectAll() // 沒有selectAll會append到body外？用select也不行
    .data(data)
    .join('circle')
    .attr('cx', d => xScale(d.currently.humidity)) // 把value丟給xScale，mapping到document上相對的位置
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', (d) => {
      if (d.currently.humidity > d3.max(humidityList) / 2 &&
        d.currently.apparentTemperature > d3.max(apparentTemperatureList) / 2
      ) {
        return 6;
      } else {
        return 4;
      }
    })
    .attr('fill', (d) => {
      if (d.currently.humidity > d3.max(humidityList) / 2 &&
        d.currently.apparentTemperature > d3.max(apparentTemperatureList) / 2
      ) {
        return 'red';
      } else {
        return 'green';
      }
    })
    .attr('data-humidity', (d) => d.currently.humidity)
    .attr('data-temperature', yAccessor);

  // Draw axis, labe, font size
  const xAxis = d3.axisBottom(xScale)
    // .ticks(5)
    .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
    .tickFormat((d) => d * 100 + '%');

  const xAxisGroup = ctr.append('g')
    .call(xAxis)
    .style('transform', `translateY(${dimension.height - dimension.margin.top * 2}px)`);

  xAxisGroup.append('text')
    .attr('x', (dimension.width - dimension.margin.top * 2) / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    // .style('font-size', '16px')
    // .style('fill', 'red')
    .classed('x-axis-label', true)
    .text('Humidity');

  const yAxis = d3.axisBottom(yScale)
    .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    .tickFormat((d) => d);

  const yAxisGroup = ctr.append('g')
    .call(yAxis)
    .style('transform', 'rotate(-270deg)');

  yAxisGroup.append('text')
    .attr('x', (dimension.width - dimension.margin.top * 2) / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    .html('Temperature &deg; F')
    .classed('y-axis-label', true);
}

drawChart()