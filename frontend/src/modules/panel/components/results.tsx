import {
  Step,
  StepIcon,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { Person } from '../../../../../backend/src/entities/person';
import {
  Result,
  ResultEdge,
} from '../../../../../backend/src/routers/search/graph';
import { Panel } from '../../common/components/panel';
import '../scss/results.scss';
import { KeyboardArrowRight as RightArrowIcon } from '@material-ui/icons';

export interface ResultsProps {
  results: Array<Result>;
  people: Array<Person>;
}

export const RelationStepIcon: React.FC<StepIconProps> = (
  props,
): JSX.Element => {
  return <StepIcon {...props} icon={<RightArrowIcon />}></StepIcon>;
};

export const Results: React.FC<ResultsProps> = ({
  results,
  people,
}): JSX.Element => {
  return (
    <Panel className="results-panel">
      <Typography variant="h5">Results</Typography>
      {results.length === 0 && (
        <section className="no-results-info">
          <Typography variant="h6" color="textSecondary">
            Results will appear here
          </Typography>
        </section>
      )}
      {results.map((result, key) => (
        <Stepper
          key={key}
          className="relation-stepper"
          activeStep={result.edges.length}
        >
          {
            <Step>
              <StepLabel StepIconComponent={RelationStepIcon}>
                {
                  people.find(
                    person => person.id.toString() === result.edges[0].fromNode,
                  )?.name
                }
              </StepLabel>
            </Step>
          }
          {result.edges.map((edge: ResultEdge, index: number) => (
            <Step key={key + index}>
              <StepLabel StepIconComponent={RelationStepIcon}>
                {
                  people.find(person => person.id.toString() === edge.toNode)
                    ?.name
                }
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      ))}
    </Panel>
  );
};
