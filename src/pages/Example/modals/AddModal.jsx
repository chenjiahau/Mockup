import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import ElementGroup from "@/components/ElementGroup";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import InputBox from "@/components/InputBox";
import RadioBox from "@/components/RadioBox";
import CheckBox from "@/components/CheckBox";
import DropdownBox from "@/components/DropdownBox";

const AddModal = ({ isVisible, onClose, onSubmit }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [gender, setGender] = useState("m");
  const [hobbies, setHobbies] = useState({
    music: false,
    movie: false,
    reading: false,
  });
  const [cityOptions, setCityOptions] = useState([
    { value: "taipei", label: "Taipei", active: true },
    { value: "taichung", label: "Taichung", active: false },
    { value: "kaohsiung", label: "Kaohsiung", active: false },
    { value: "tainan", label: "Tainan", active: false },
    { value: "hsinchu", label: "Hsinchu", active: false },
    { value: "keelung", label: "Keelung", active: false },
  ]);

  const [colorOptions, setColorOptions] = useState([
    { value: "red", label: "Red", hashCode: "#ff0000", active: true },
    { value: "blue", label: "Blue", hashCode: "#0000ff", active: false },
    { value: "green", label: "Green", hashCode: "#00ff00", active: false },
    { value: "yellow", label: "Yellow", hashCode: "#ffff00", active: false },
    { value: "purple", label: "Purple", hashCode: "#800080", active: false },
    { value: "orange", label: "Orange", hashCode: "#ffa500", active: false },
  ]);

  const handleCityChange = (option) => {
    setCityOptions(
      cityOptions.map((cityOption) => {
        cityOption.active = cityOption.value === option.value;
        return cityOption;
      })
    );
  };

  const handleColorChange = (option) => {
    setColorOptions(
      colorOptions.map((colorOption) => {
        colorOption.active = colorOption.value === option.value;
        return colorOption;
      })
    );
  };

  return (
    <ModalBox
      isVisible={isVisible}
      title='Modal Title'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormLabel forName='search'>Search</FormLabel>
        <InputBox
          type='text'
          id='search'
          name='search'
          placeholder='Enter your account'
          value={account}
          onChange={(value) => setAccount(value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Name</FormLabel>
        <InputBox
          type={isPasswordVisible ? "text" : "password"}
          id='password'
          name='password'
          placeholder='Enter your password'
          value={password}
          onChange={(value) => setPassword(value)}
        >
          {
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        </InputBox>
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Gender</FormLabel>
        <ElementGroup>
          <RadioBox checked={gender === "m"} onChange={() => setGender("m")}>
            Male
          </RadioBox>
          <RadioBox checked={gender === "f"} onChange={() => setGender("f")}>
            Female
          </RadioBox>
        </ElementGroup>
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Hobbies</FormLabel>
        <ElementGroup>
          <CheckBox
            checked={hobbies.music}
            onChange={() => setHobbies({ ...hobbies, music: !hobbies.music })}
          >
            Music
          </CheckBox>
          <CheckBox
            checked={hobbies.movie}
            onChange={() => setHobbies({ ...hobbies, movie: !hobbies.movie })}
          >
            Movie
          </CheckBox>
          <CheckBox
            checked={hobbies.reading}
            onChange={() => {
              setHobbies({ ...hobbies, reading: !hobbies.reading });
            }}
          >
            Reading
          </CheckBox>
        </ElementGroup>
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>City</FormLabel>
        <DropdownBox
          options={cityOptions}
          onClick={(option) => handleCityChange(option)}
          zIndex={12}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Color</FormLabel>
        <DropdownBox
          options={colorOptions}
          onClick={(option) => handleColorChange(option)}
          isColor={true}
          zIndex={12}
        />
      </FormGroup>
    </ModalBox>
  );
};

AddModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddModal;
