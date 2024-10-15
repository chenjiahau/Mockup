import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "@/components/Breadcrumbs";
import MainTitle from "@/components/MainTitle";
import Form from "@/components/Form";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import InputBox from "@/components/InputBox";
import RadioBox from "@/components/RadioBox";
import CheckBox from "@/components/CheckBox";
import DropdownBox from "@/components/DropdownBox";
import IconButton from "@/components/IconButton";
import LinkButton from "@/components/LinkButton";
import EditableTextBox from "@/components/EditableTextBox";
import ButtonBox from "@/components/ButtonBox";
import TableBox from "@/components/TableBox";
import PaginationBox, { numberOfRow } from "@/components/PaginationBox";
import TagBox from "@/components/TagBox";
import AddModal from "./modals/AddModal";

import ElementGroup from "@/components/ElementGroup";
import Spacer from "@/components/Spacer";

const Example = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/members", label: "Members" },
  ];

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

  const [note, setNote] = useState("Hello World");
  const [originalNote, setOriginalNote] = useState(note);
  const [isEditable, setIsEditable] = useState(false);

  const [tableHeaders, setTableHeader] = useState([
    {
      key: "index",
      label: "#",
      isSortable: false,
      isCenter: true,
      sort: "",
    },
    {
      key: "account",
      label: "Account",
      isSortable: true,
      sort: "",
    },
    {
      key: "password",
      label: "Password",
      isSortable: true,
      sort: "",
    },
    {
      key: "gender",
      label: "Gender",
      isSortable: true,
      sort: "",
    },
    { key: "color", label: "Color", isSortable: true, sort: "" },
    { key: "city", label: "City", isSortable: true, sort: "" },
    {
      key: "hobbies",
      label: "Hobbies",
      isSortable: true,
      sort: "",
    },
    {
      key: "note",
      label: "Note",
      isSortable: true,
      sort: "",
    },
    {
      key: "tag",
      label: "Tag",
      isSortable: false,
      width: "100",
      sort: "",
    },
    {
      key: "action",
      label: "Action",
      isSortable: false,
      width: "50",
      sort: "",
    },
  ]);
  const [data, setData] = useState([
    {
      index: 1,
      account: "admin 123 432 123 342 366 574",
      password: "123456",
      gender: "m",
      color: "red",
      city: "taipei",
      hobbies: "music",
      note: "Hello World",
      tag: <TagBox tag={{ label: "Tag", hashCode: "#ff0000" }} />,
      action: (
        <div className='flex items-center gap-4'>
          <IconButton onClick={() => console.log("edit")}>
            <FontAwesomeIcon icon={faEye} />
          </IconButton>
          <IconButton onClick={() => console.log("delete")}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </IconButton>
        </div>
      ),
    },
    {
      index: 2,
      account: "user",
      password: "654321",
      gender: "f",
      color: "blue",
      city: "taichung",
      hobbies: "movie",
      note: "Hello World",
      tag: (
        <TagBox
          tag={{
            label: "In Wall AP",
            hashCode: "#0000ff",
          }}
          onClick={() => setIsModalVisible(true)}
        />
      ),
      action: (
        <div className='flex items-center gap-4'>
          <IconButton disabled={true} onClick={() => console.log("edit")}>
            <FontAwesomeIcon icon={faEye} />
          </IconButton>
          <IconButton onClick={() => console.log("delete")}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </IconButton>
        </div>
      ),
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInitialization = () => {
    const totalDataNumber = 100;
    setTotalDataCount(totalDataNumber);

    const totalPageNum = Math.ceil(totalDataNumber / pageSize);
    if (totalPageNum < currentPage) {
      setCurrentPage(1);
    }
  };

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

  const handleChangeHeader = (newHeader) => {
    setTableHeader(newHeader);
  };

  const handlerChangeData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    handleInitialization();
  }, [pageSize, currentPage]);

  return (
    <>
      <Breadcrumbs linkList={linkList} />
      <div className='custom-container primary-bg'>
        <MainTitle>Members</MainTitle>
        <Form>
          <FormGroup>
            <FormLabel forName='search'>Search</FormLabel>
            <InputBox
              type='text'
              id='search'
              name='search'
              placeholder='Search'
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
              placeholder='Password'
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
              <RadioBox
                checked={gender === "m"}
                onChange={() => setGender("m")}
              >
                Male
              </RadioBox>
              <RadioBox
                checked={gender === "f"}
                onChange={() => setGender("f")}
              >
                Female
              </RadioBox>
            </ElementGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel forName='name'>Hobbies</FormLabel>
            <ElementGroup>
              <CheckBox
                checked={hobbies.music}
                onChange={() =>
                  setHobbies({ ...hobbies, music: !hobbies.music })
                }
              >
                Music
              </CheckBox>
              <CheckBox
                checked={hobbies.movie}
                onChange={() =>
                  setHobbies({ ...hobbies, movie: !hobbies.movie })
                }
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
          <FormGroup>
            <FormLabel forName='name'>Eyes</FormLabel>
            <ElementGroup>
              <IconButton onClick={() => console.log("↑")}>
                <FontAwesomeIcon icon={faEye} />
              </IconButton>
              <IconButton onClick={() => console.log("2")}>
                <FontAwesomeIcon icon={faEyeSlash} />
              </IconButton>
            </ElementGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel forName='name'>Note</FormLabel>
            {isEditable ? (
              <InputBox
                type='text'
                id='note'
                name='note'
                value={note}
                onChange={(value) => {
                  setNote(value);
                }}
                onClose={(value) => {
                  setIsEditable(false);
                  setNote(value);
                  setOriginalNote(value);
                }}
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  onClick={() => {
                    setIsEditable(false);
                    setOriginalNote(note);
                  }}
                />
                <div className='mr-2'></div>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => {
                    setIsEditable(false);
                    setNote(originalNote);
                  }}
                />
              </InputBox>
            ) : (
              <EditableTextBox
                text={note}
                onClick={() => {
                  setIsEditable(true);
                  setOriginalNote(note);
                }}
              />
            )}
          </FormGroup>
          <div className='flex items-center gap-4'>
            <ButtonBox title='Submit' />
            <ButtonBox title='Disabled Submit' isDisabled={true} />
            <LinkButton to='/members' title='Back' />
          </div>
          <Spacer />
          <TableBox
            headers={tableHeaders}
            onChangeHeader={handleChangeHeader}
            data={data}
            onChangeData={handlerChangeData}
          />
          <Spacer />
          <PaginationBox
            currentPage={currentPage}
            totalCount={totalDataCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
          <Spacer />
          <ButtonBox
            title='Open Modal'
            onClick={() => setIsModalVisible(true)}
          />
          {isModalVisible && (
            <AddModal
              isVisible={isModalVisible}
              title='Modal Title'
              onClose={() => setIsModalVisible(false)}
              onSubmit={() => setIsModalVisible(false)}
            />
          )}
        </Form>
      </div>
    </>
  );
};

export default Example;
