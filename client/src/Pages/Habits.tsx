import React, { useEffect, useState } from "react";
import "../Css/Habits.css";
import { Grid, Header, Segment } from "semantic-ui-react";
import {getHabitPhrase} from '../util/requests'

const Habits: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  useEffect(() => {
    async function getPhrase() {
      const res = await getHabitPhrase()
      setPhrases(res)
    }
    getPhrase()
  }, [])

  return (
    <div>
      <Segment id="habitsCover">
        <Grid>
          <Grid.Row>
            <blockquote id="time-phrase">
              The two most powerful warriors are patience and time.
              <span>Leo Tolstoy</span>
            </blockquote>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
                {
                    phrases.map(phrase => (
                        <p key={phrase.author}>
                            {phrase.author}
                        </p>
                    ))
                }
            </Grid.Column>
            <Grid.Column width={12}>column1</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Habits;
