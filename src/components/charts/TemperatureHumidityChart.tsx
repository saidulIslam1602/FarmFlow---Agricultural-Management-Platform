'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';

export default function TemperatureHumidityChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const data = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      temperature: 18 + Math.sin(i / 3) * 8 + Math.random() * 2,
      humidity: 55 + Math.cos(i / 4) * 15 + Math.random() * 5,
    }));

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 60, bottom: 40, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 23]).range([0, width]);

    const yTemp = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.temperature) as number - 2,
        d3.max(data, (d) => d.temperature) as number + 2,
      ])
      .range([height, 0]);

    const yHumidity = d3
      .scaleLinear()
      .domain([40, 80])
      .range([height, 0]);

    // Temperature line
    const tempLine = d3
      .line<typeof data[0]>()
      .x((d) => x(d.hour))
      .y((d) => yTemp(d.temperature))
      .curve(d3.curveMonotoneX);

    // Humidity line
    const humidityLine = d3
      .line<typeof data[0]>()
      .x((d) => x(d.hour))
      .y((d) => yHumidity(d.humidity))
      .curve(d3.curveMonotoneX);

    // Add temperature line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2.5)
      .attr('d', tempLine);

    // Add humidity line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2.5)
      .attr('d', humidityLine);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat((d) => `${d}:00`))
      .selectAll('text')
      .style('font-size', '11px');

    // Left Y axis (temperature)
    svg
      .append('g')
      .call(d3.axisLeft(yTemp).ticks(5))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#f59e0b');

    // Right Y axis (humidity)
    svg
      .append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(yHumidity).ticks(5))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#3b82f6');

    // Left Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#f59e0b')
      .text('Temperature (°C)');

    // Right Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', width + margin.right - 10)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#3b82f6')
      .text('Humidity (%)');

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width / 2 - 80}, 0)`);

    legend
      .append('line')
      .attr('x1', 0)
      .attr('x2', 30)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2.5);

    legend
      .append('text')
      .attr('x', 40)
      .attr('y', 5)
      .text('Temperature')
      .style('font-size', '12px')
      .attr('fill', '#374151');

    legend
      .append('line')
      .attr('x1', 120)
      .attr('x2', 150)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2.5);

    legend
      .append('text')
      .attr('x', 160)
      .attr('y', 5)
      .text('Humidity')
      .style('font-size', '12px')
      .attr('fill', '#374151');
  }, []);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">
        Temperature & Humidity (24h)
      </h3>
      <p className="text-sm text-gray-500">Real-time environmental monitoring</p>
      <div className="mt-4">
        <svg ref={svgRef} className="w-full" />
      </div>
    </Card>
  );
}