'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';

interface CropYieldChartProps {
  timeRange: '7d' | '30d' | '90d';
}

export default function CropYieldChart({ timeRange }: CropYieldChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Generate mock data based on time range
    const dataPoints = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = Array.from({ length: dataPoints }, (_, i) => ({
      date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000),
      yield: 50 + Math.random() * 30 + i * 0.5,
    }));

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.yield) as number])
      .nice()
      .range([height, 0]);

    // Line generator
    const line = d3
      .line<{ date: Date; yield: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.yield))
      .curve(d3.curveMonotoneX);

    // Area generator
    const area = d3
      .area<{ date: Date; yield: number }>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.yield))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'yield-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#22c55e').attr('stop-opacity', 0.3);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#22c55e').attr('stop-opacity', 0);

    // Add area
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'url(#yield-gradient)')
      .attr('d', area);

    // Add line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll('text')
      .style('font-size', '12px');

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '12px');

    // Add Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Yield (kg/ha)');
  }, [timeRange]);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Crop Yield Trend</h3>
      <p className="text-sm text-gray-500">Expected yield over time</p>
      <div className="mt-4">
        <svg ref={svgRef} className="w-full" />
      </div>
    </Card>
  );
}