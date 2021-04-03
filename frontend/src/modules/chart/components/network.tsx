import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Graph, GraphData, GraphNode, GraphLink } from 'react-d3-graph';
import { Person } from '../../../../../backend/src/entities/person';

export interface NetworkChartProps {
  people: Array<Person>;
}

export const NetworkChart: React.FC<NetworkChartProps> = ({
  people,
}): JSX.Element => {
  const data: GraphData<GraphNode, GraphLink> = {
    nodes: people.map(person => {
      return {
        id: person.name,
        name: person.name,
        labelProperty: 'name',
        renderLabel: true,
        fontColor: '#FFFFFF',
        size: 200,
        fontSize: 14,
      };
    }),
    links: people
      .map(p => {
        return p.related.map(
          related =>
            ({
              source: p.name,
              target: people.find(p => p.id === related)?.name as string,
            } as GraphLink),
        );
      })
      .flat(),
  };
  return (
    <Paper>
      <Typography variant="h4" style={{ padding: '1rem' }}>
        Graph view
      </Typography>
      <section
        style={{
          background: 'linear-gradient(to top, #cb356b, #bd3f32)',
          borderRadius: '0 0 5px 5px',
        }}
      >
        <Graph
          id="people"
          data={data}
          config={{
            node: {
              color: '#26DEB0',
            },
            link: {
              color: '#FFFFFF',
            },
            width: 900,
          }}
        />
      </section>
    </Paper>
  );
};
