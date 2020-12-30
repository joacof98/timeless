import React, { useEffect, useState, useContext } from "react";
import "../Css/Habits.css";
import { Grid, Segment, Transition } from "semantic-ui-react";
import { getHabitPhrase, getUser } from '../util/requests'
import { AuthContext } from "../util/auth";

import ModalCreateHabit from '../Components/ModalCreateHabit'
import HabitCard from '../Components/HabitCard'

const _ = require('lodash')
const Habits: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [phrase, setPhrase] = useState<Phrase>({
    author: "",
    text: "",
  });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitCreated, setHabitCreated] = useState<boolean>(false);

  useEffect(() => {
    async function getPhrase() {
      const res = await getHabitPhrase();
      setPhrase(_.sample(res));
    }
    getPhrase();
  }, [])

  useEffect(() => {
    async function getUserHabits() {
      const res = await getUser(user.username);
      setHabits(res.habits);
    }
    getUserHabits();
  }, [habitCreated, user.username]);

  const fetchHabits = () => {
    setHabitCreated(!habitCreated);
  };

  return (
    <div>
      <Segment id="habitsCover">
        <Grid textAlign="center">
          <Grid.Row>
            <blockquote id="time-phrase">
              {phrase.text}
              <span>{phrase.author}</span>
            </blockquote>
          </Grid.Row>
          <ModalCreateHabit fetchHabits={fetchHabits} />
          <Grid.Row style={{ "background-color": "#e6e0b2", 'marginTop': '15px' }}>
            <Transition.Group>
              {habits &&
                habits.map((h) => (
                  <Grid.Column
                    key={h.name}
                    computer={4}
                    mobile={16}
                    style={{ marginBottom: 20 }}
                  >
                    <HabitCard habit={h} fetchHabits={fetchHabits} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Habits;
