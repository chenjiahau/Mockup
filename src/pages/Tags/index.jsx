import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { orderBy } from "lodash";

import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import InputBox from "@/components/InputBox";
import EditableTextBox from "@/components/EditableTextBox";
import TagBox from "@/components/TagBox";
import IconButton from "@/components/IconButton";
import ToolbarBox from "@/components/ToolbarBox";
import TableBox from "@/components/TableBox";
import PaginationBox, { numberOfRow } from "@/components/PaginationBox";
import Spacer from "@/components/Spacer";

import TagModal from "./TagModal";
import ColorModal from "./ColorModal";
import DeleteModal from "./DeleteModal";

const Tags = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/tags", label: "Tags" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(200);
  const [dataAry, setDataAry] = useState([
    {
      id: 1,
      name: "Feature",
      color: "Red",
      colorDetail: {
        categoryId: 1,
        categoryName: "Red",
        colorId: 1,
        colorName: "Red",
        colorHexCode: "#FF0000",
      },
    },
    {
      id: 2,
      name: "Bug",
      color: "Green",
      colorDetail: {
        categoryId: 2,
        categoryName: "Green",
        colorId: 4,
        colorName: "Green",
        colorHexCode: "#008000",
      },
    },
    {
      id: 3,
      name: "Enhancement",
      color: "Blue",
      colorDetail: {
        categoryId: 3,
        categoryName: "Blue",
        colorId: 7,
        colorName: "Blue",
        colorHexCode: "#0000FF",
      },
    },
    {
      id: 4,
      name: "Task",
      color: "Yellow",
      colorDetail: {
        categoryId: 4,
        categoryName: "Yellow",
        colorId: 10,
        colorName: "Yellow",
        colorHexCode: "#FFFF00",
      },
    },
    {
      id: 5,
      name: "Question",
      color: "Purple",
      colorDetail: {
        categoryId: 5,
        categoryName: "Purple",
        colorId: 13,
        colorName: "Purple",
        colorHexCode: "#800080",
      },
    },
    {
      id: 6,
      name: "Documentation",
      color: "Orange",
      colorDetail: {
        categoryId: 6,
        categoryName: "Orange",
        colorId: 16,
        colorName: "Orange",
        colorHexCode: "#FFA500",
      },
    },
    {
      id: 7,
      name: "Review",
      color: "Pink",
      colorDetail: {
        categoryId: 7,
        categoryName: "Pink",
        colorId: 19,
        colorName: "Pink",
        colorHexCode: "#FFC0CB",
      },
    },
    {
      id: 8,
      name: "Meeting",
      color: "Brown",
      colorDetail: {
        categoryId: 8,
        categoryName: "Brown",
        colorId: 22,
        colorName: "Brown",
        colorHexCode: "#A52A2A",
      },
    },
    {
      id: 9,
      name: "Testing",
      color: "Light Blue",
      colorDetail: {
        categoryId: 9,
        categoryName: "Light Blue",
        colorId: 25,
        colorName: "Light Blue",
        colorHexCode: "#ADD8E6",
      },
    },
  ]);
  const [tableHeaders, setTableHeader] = useState([
    {
      key: "index",
      label: "#",
      isSortable: false,
      isCenter: true,
      width: "50",
      sort: "",
    },
    {
      key: "name",
      label: "Tag",
      isSortable: true,
      sort: "",
    },
    {
      key: "color",
      label: "Color",
      isSortable: true,
      isCenter: true,
      width: "220",
      sort: "",
    },
    {
      key: "action",
      label: "Action",
      isSortable: false,
      isCenter: true,
      width: "100",
      sort: "",
    },
  ]);
  const [tableData, setTableData] = useState([]);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleChangeHeader = (newHeader, column, order) => {
    setTableHeader(newHeader);
    const updatedData = orderBy(dataAry, [column], [order]);
    setDataAry(updatedData);
  };

  const handleEditName = (id) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          isEdit: !data.isEdit,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleChangeName = (id, name) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          name: name,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleSaveName = (id) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          isEdit: false,
          originalName: data.name,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleCancelEdit = (id) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          isEdit: false,
          name: data.name,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleOpenDeleteModal = (tag) => {
    setOpenDeleteModal(true);
    setSelectedTag(tag);
  };

  useEffect(() => {
    const updatedTableData = dataAry.map((data, index) => {
      return {
        ...data,
        index: index + 1,
        isEdit: false,
        name: data.isEdit ? (
          <InputBox
            type='text'
            id={`tag${data.id}`}
            name={`tag-${data.id}`}
            value={data.name}
            onChange={(value) => handleChangeName(data.id, value)}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              onClick={() => handleSaveName(data.id)}
            />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleCancelEdit(data.id)}
            />
          </InputBox>
        ) : (
          <EditableTextBox
            text={data.name}
            onClick={() => {
              handleEditName(data.id);
            }}
          />
        ),
        color: (
          <TagBox
            tag={{ label: data.name, hashCode: data.colorDetail.colorHexCode }}
            onClick={() => {
              setOpenColorModal(true);
              setSelectedTag(data);
            }}
          />
        ),
        action: (
          <div className='flex items-center gap-4'>
            <IconButton onClick={() => handleOpenDeleteModal(data)}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </div>
        ),
      };
    });

    setTableData(updatedTableData);
  }, [dataAry]);

  return (
    <>
      <Breadcrumbs linkList={linkList} />
      <div className='custom-container primary-bg'>
        <Form>
          <ToolbarBox>
            <IconButton rounded={true} onClick={() => setOpenTagModal(true)}>
              <FontAwesomeIcon icon={faPlus} />
              <div>Add</div>
            </IconButton>
          </ToolbarBox>

          <TableBox
            headers={tableHeaders}
            onChangeHeader={handleChangeHeader}
            data={tableData}
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
        </Form>
      </div>

      <TagModal
        openModal={openTagModal}
        onClose={() => setOpenTagModal(false)}
        onSubmit={() => setOpenTagModal(false)}
      />

      <ColorModal
        openModal={openColorModal}
        selectedTag={selectedTag}
        onClose={() => setOpenColorModal(false)}
        onSubmit={() => setOpenColorModal(false)}
      />

      <DeleteModal
        deleteMode={true}
        openModal={openDeleteModal}
        selectedTag={selectedTag}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default Tags;
