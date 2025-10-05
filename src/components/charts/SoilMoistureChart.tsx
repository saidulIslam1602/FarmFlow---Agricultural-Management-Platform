'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';

interface SoilMoistureChartProps {
  timeRange: '7d' | '30d' | '90d';
}

export default function SoilMoistureChart({ timeRange }: SoilMoistureChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const fields = ['North Field', 'South Valley', 'East Meadow', 'West Hills'];
    const data = fields.map((field) => ({
      field,
      moisture: 30 + Math.random() * 50,
    }));

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.field))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // Color scale based on moisture level
    const colorScale = (value: number) => {
      if (value < 40) return '#ef4444'; // red
      if (value < 60) return '#f59e0b'; // orange
      return '#22c55e'; // green
    };

    // Add bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.field) as number)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', (d) => colorScale(d.moisture))
      .attr('rx', 4)
      .transition()
      .duration(800)
      .attr('y', (d) => y(d.moisture))
      .attr('height', (d) => height - y(d.moisture));

    // Add value labels
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (x(d.field) as number) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.moisture) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', '#374151')
      .text((d) => `${d.moisture.toFixed(0)}%`)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '11px')
      .attr('transform', 'rotate(-15)')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '12px');

    // Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Moisture (%)');
  }, [timeRange]);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Soil Moisture Levels</h3>
      <p className="text-sm text-gray-500">Current moisture by field</p>
      <div className="mt-4">
        <svg ref={svgRef} className="w-full" />
      </div>
    </Card>
  );
}