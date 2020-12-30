import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Dropdown,
  Form,
  Label,
} from "semantic-ui-react";
import "../Css/Habits.css";
import { colorOptions } from "../util/ColorOptions";
import { updateHabit, deleteHabit } from '../util/requests'

const ModalUpdateHabit: React.FC<{
  color: any;
  habit: Habit;
  fetchHabits: () => void;
}> = ({ color, habit, fetchHabits }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [colorLabel, setColorLabel] = useState<string>(habit.color);
  const [habitInfo, setHabitInfo] = useState<Habit>({
    name: habit.name,
    description: habit.description,
    to_avoid: habit.to_avoid,
    color: habit.color,
    _id: habit._id,
    currentStreak: habit.currentStreak,
  });
  const [errors, setErrors] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHabitInfo({ ...habitInfo, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (name: string, value: string): void => {
    setHabitInfo({ ...habitInfo, [name]: value });
  };

  const handleColor = (color: string) => {
    setColorLabel(color);
    setHabitInfo({ ...habitInfo, color: color.toLowerCase() });
  };

  const updateUserHabit = async () => {
    const res = await updateHabit(habitInfo._id, {
      name: habitInfo.name,
      description: habitInfo.description,
      to_avoid: habitInfo.to_avoid,
      color: habitInfo.color,
    });

    if (res.error) {
      setErrors(res.error.fields);
    } else {
      fetchHabits();
      setOpen(false);
      setErrors('')
    }
  };

  const deleteUserHabit = async () => {
    await deleteHabit(habitInfo._id)
    setOpen(false)
    fetchHabits()
  }

  return (
    <div>
      <Modal
        closeIcon
        open={open}
        trigger={
          <Button
            color={color}
            circular
            floated="right"
            icon="edit"
            size="mini"
          />
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="edit" id="timeless-font" content="Habit Information" />
        <Header as="h3" id="timeless-font">
          <Icon name="flag checkered" />
          {habitInfo.currentStreak.day} Day Streak
        </Header>
        <Modal.Content scrolling>
          <Form noValidate id="timeless-font">
            <Form.Input
              label="Name"
              value={habitInfo.name}
              name="name"
              onChange={handleChange}
            />
            <Form.Input label="Description">
              <textarea
                style={{ height: "125px" }}
                value={habitInfo.description}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
                  handleChangeTextArea("description", ev.target.value)
                }
              />
            </Form.Input>

            <Form.Input label="To Avoid">
              <textarea
                style={{ height: "125px" }}
                value={habitInfo.to_avoid}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
                  handleChangeTextArea("to_avoid", ev.target.value)
                }
              />
            </Form.Input>

            <b>
              <p style={{ marginBottom: "5px", marginTop: "10px" }}>
                Select{" "}
                <Label color={colorLabel.toLowerCase() as any}>Color</Label>
              </p>
            </b>
            <Dropdown text={colorLabel} multiple icon="paint brush">
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  {colorOptions.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      {...option}
                      onClick={() => handleColor(option.value)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
          {errors && (
            <div className="ui error message">
              <ul className="list">
                <b>{errors}</b>
              </ul>
            </div>
          )}
        </Modal.Content>

        <Modal.Actions>
          <Button
            floated="left"
            style={{ backgroundColor: "#D9424B" }}
            onClick={deleteUserHabit}
          >
            Delete Habit
          </Button>
          <Button
            style={{ backgroundColor: "#D9424B", color: "white" }}
            onClick={() => setOpen(false)}
          >
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#315054", color: "white" }}
            onClick={updateUserHabit}
          >
            <Icon name="save outline" /> Update
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalUpdateHabit;
