'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';
import { Download } from 'lucide-react';

interface SoilMoistureChartProps {
  timeRange: '7d' | '30d' | '90d';
}

export default function EnhancedSoilMoistureChart({ timeRange }: SoilMoistureChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const fields = [
      { field: 'North Field', moisture: 68, previous: 65 },
      { field: 'South Valley', moisture: 45, previous: 52 },
      { field: 'East Meadow', moisture: 72, previous: 70 },
      { field: 'West Hills', moisture: 35, previous: 38 },
      { field: 'Central Plains', moisture: 58, previous: 55 },
    ];

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(fields.map((d) => d.field))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // Color scale
    const colorScale = (value: number) => {
      if (value < 40) return '#ef4444';
      if (value < 50) return '#f97316';
      if (value < 60) return '#f59e0b';
      return '#22c55e';
    };

    // Threshold lines
    const thresholds = [
      { value: 40, label: 'Critical', color: '#fee2e2' },
      { value: 60, label: 'Optimal', color: '#dcfce7' },
    ];

    thresholds.forEach((threshold) => {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(threshold.value))
        .attr('y2', y(threshold.value))
        .attr('stroke', threshold.color)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.5);

      svg.append('text')
        .attr('x', width - 5)
        .attr('y', y(threshold.value) - 5)
        .attr('text-anchor', 'end')
        .style('font-size', '10px')
        .style('fill', '#6b7280')
        .style('font-weight', '500')
        .text(threshold.label);
    });

    // Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Bars with animation
    svg
      .selectAll('.bar')
      .data(fields)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.field) as number)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', (d) => colorScale(d.moisture))
      .attr('rx', 6)
      .style('cursor', 'pointer')
      .style('filter', (d) => selectedField === d.field ? 'brightness(1.1)' : 'none')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('filter', 'brightness(1.1)')
          .attr('y', y(d.moisture) - 5)
          .attr('height', height - y(d.moisture) + 5);

        const change = d.moisture - d.previous;
        const changePercent = ((change / d.previous) * 100).toFixed(1);

        tooltip
          .style('opacity', 1)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 60}px`)
          .html(`
            <div class="space-y-1">
              <div class="font-semibold text-gray-900">${d.field}</div>
              <div class="text-lg font-bold" style="color: ${colorScale(d.moisture)}">
                ${d.moisture.toFixed(0)}% Moisture
              </div>
              <div class="flex items-center space-x-1 text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}">
                ${change >= 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(0)}% (${changePercent}%)
                <span class="text-gray-500">vs previous</span>
              </div>
              <div class="mt-2 pt-2 border-t text-xs text-gray-600">
                Status: ${d.moisture < 40 ? 'Critical' : d.moisture < 60 ? 'Warning' : 'Good'}
              </div>
            </div>
          `);
      })
      .on('mouseout', function (event, d) {
        if (selectedField !== d.field) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('filter', 'none')
            .attr('y', y(d.moisture))
            .attr('height', height - y(d.moisture));
        }

        tooltip.style('opacity', 0);
      })
      .on('click', function (event, d) {
        setSelectedField(selectedField === d.field ? null : d.field);
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('y', (d) => y(d.moisture))
      .attr('height', (d) => height - y(d.moisture));

    // Value labels on bars
    svg
      .selectAll('.label')
      .data(fields)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (x(d.field) as number) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.moisture) - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '700')
      .style('fill', '#1f2937')
      .text((d) => `${d.moisture.toFixed(0)}%`)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 500)
      .style('opacity', 1);

    // Change indicators
    svg
      .selectAll('.change-indicator')
      .data(fields)
      .enter()
      .append('text')
      .attr('class', 'change-indicator')
      .attr('x', (d) => (x(d.field) as number) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.moisture) - 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', (d) => d.moisture >= d.previous ? '#22c55e' : '#ef4444')
      .text((d) => {
        const change = d.moisture - d.previous;
        return `${change >= 0 ? '↑' : '↓'}${Math.abs(change).toFixed(0)}%`;
      })
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 700)
      .style('opacity', 1);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .attr('transform', 'rotate(-20)')
      .style('text-anchor', 'end')
      .attr('fill', '#374151');

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
      .selectAll('text')
      .style('font-size', '12px')
      .attr('fill', '#6b7280');

    // Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 15)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('fill', '#374151')
      .text('Soil Moisture (%)');

  }, [timeRange, selectedField]);

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Soil Moisture Levels</h3>
          <p className="text-sm text-gray-500">Current moisture by field with change indicators</p>
        </div>
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          title="Export data"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="inline-flex items-center space-x-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span>&lt; 40% Critical</span>
        </div>
        <div className="inline-flex items-center space-x-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <span>40-60% Warning</span>
        </div>
        <div className="inline-flex items-center space-x-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>&gt; 60% Optimal</span>
        </div>
      </div>

      <div className="relative mt-4">
        <svg ref={svgRef} className="w-full" />
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed z-50 rounded-lg border bg-white p-3 shadow-xl transition-opacity"
          style={{ opacity: 0 }}
        />
      </div>

      <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
        <strong>Tip:</strong> Hover over bars for detailed information. Click to select a field.
      </div>
    </Card>
  );
}