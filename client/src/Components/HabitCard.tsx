import React, { useState } from "react";
import { Card, Button } from "semantic-ui-react";
import "../Css/Habits.css";
import {updateHabitStreak} from '../util/requests'

import ModalUpdateHabit from '../Components/ModalUpdateHabit'

const HabitCard: React.FC<{
  habit: Habit;
  fetchHabits: () => void;
}> = ({ habit, fetchHabits }) => {
  const [errors, setErrors] = useState({});

  const addStreak = async () => {
    const res = await updateHabitStreak(habit._id);
    if (res.error) {
      setErrors(res.error);
    } else {
      fetchHabits();
    }
  };

  return (
    <div>
      <Card raised color={habit.color as any} fluid>
        <Card.Content>
          <ModalUpdateHabit
            color={habit.color as any}
            habit={habit}
            fetchHabits={fetchHabits}
          />

          <Card.Header id="timeless-font" style={{ marginLeft: "25px" }}>
            {habit.name.substr(0, 19)}
          </Card.Header>
          <Card.Description>{habit.description.substr(0, 35)}</Card.Description>
        </Card.Content>
        <b>
          <p id="timeless-font" style={{ marginBottom: "5px" }}>
            Day Streak: {habit.currentStreak.day}
          </p>
        </b>
        <Card.Content extra>
          {Object.keys(errors).length > 0 ? (
            <div>
              {Object.values(errors).map((value: any) => (
                <Button
                  id="timeless-font"
                  style={{ backgroundColor: "#D9424B", color: "white" }}
                >
                  {value}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              id="timeless-font"
              color={habit.color as any}
              onClick={addStreak}
            >
              Mark As Done!
            </Button>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default HabitCard;
