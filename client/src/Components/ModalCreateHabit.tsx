import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Dimmer,
  Loader,
  Dropdown,
  Label,
} from "semantic-ui-react";
import "../Css/Habits.css";
import { colorOptions } from "../util/ColorOptions";
import {createHabit} from '../util/requests'

const ModalCreateHabit: React.FC<{fetchHabits: () => void}> = ({fetchHabits}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [colorLabel, setColorLabel] = useState<string>("Blue");
  const [habitInfo, setHabitInfo] = useState<UserHabitInput>({
    name: '',
    description: '',
    to_avoid: '',
    color: colorLabel.toLowerCase()
  })
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHabitInfo({ ...habitInfo, [e.target.name]: e.target.value });
  };

  const handleColor = (color: string) => {
    setColorLabel(color)
    setHabitInfo({...habitInfo, color: color.toLowerCase()})
  }

  const createUserHabit = async () => {
    setLoader(true);
    const res = await createHabit(habitInfo);
    setLoader(false)
    if (res.error) {
      setErrors(res.error);
    } else {
      fetchHabits();
      setOpen(false);
      setErrors({})
    }
  }

  return (
    <div>
      <Modal
        closeIcon
        open={open}
        trigger={
          <Button id="btnMain" size="big">
            Create Habit
          </Button>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {loader && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        <Header icon="chess" id='timeless-font' content="Create your habit" />
        <Modal.Content>
          <Form noValidate id='timeless-font'>
            <Form.Input
              icon="pencil alternate"
              iconPosition="left"
              label="Name"
              placeholder="Enter a name or title for the habit"
              name="name"
              onChange={handleChange}
            />

            <Form.Input
              icon="list"
              iconPosition="left"
              label="Description"
              placeholder="Enter a description"
              name="description"
              onChange={handleChange}
            />

            <Form.Input
              icon="eye"
              iconPosition="left"
              label="To Avoid"
              placeholder="Enter the things you need to avoid to foccus your attention in this habit."
              name="to_avoid"
              onChange={handleChange}
            />

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
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value: any) => (
                  <li key={value}>
                    <b>{value}</b>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Content>

        <Modal.Actions>
          <Button
            style={{ backgroundColor: "#D9424B", color: "white" }}
            onClick={() => setOpen(false)}
          >
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#315054", color: "white" }}
            onClick={createUserHabit}
          >
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalCreateHabit;
