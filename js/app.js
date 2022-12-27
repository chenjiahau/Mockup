const dimension = {
  width: 600,
  height: 600,
  radius: 300
};

const pieChart = {
  position: {
    x: dimension.width / 2,
    y: dimension.height / 2
  },
  radius: {
    outer: dimension.radius,
    inner: 10
  },
  stroke: {
    color: '#fff',
    width: 5
  }
}

const drawChart = async () => {
  const data = await d3.json('data.json');

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimension.width)
    .attr('height', dimension.height);

  const graph = svg.append('g')
    .attr('transform', `translate(${pieChart.position.x}, ${pieChart.position.y})`);

  const pie = d3.pie()
    .sort(null)
    .value(d => d.p);

  const arcPath = d3.arc()
    .outerRadius(pieChart.radius.outer)
    .innerRadius(pieChart.radius.inner);

  const colour = d3
    .scaleOrdinal(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'])
    .domain(data.map(d => d.name));

  const paths = graph.selectAll('path')
    .data(pie(data));


  const arcTweenEnter = (d) => {
    var i = d3.interpolate(d.endAngle - 0.1, d.startAngle);

    return function (t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };

  paths.enter()
    .append('path')
    .attr('d', arcPath)
    .attr('stroke', pieChart.stroke.color)
    .attr('stroke-width', pieChart.stroke.width)
    .attr('fill', d => colour(d.data.name))
    .transition().duration(3000).attrTween("d", arcTweenEnter);

  paths.enter()
    .append('text')
    .text(d => {
      if (d.data.p > 0)
        return d.data.name
    })
    .attr('transform', d => `translate(${arcPath.centroid(d)})`)
    .classed('label', true);
}

drawChart()