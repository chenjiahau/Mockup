import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faPlus,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { orderBy } from "lodash";

import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import ElementGroup from "@/components/ElementGroup";
import InputBox from "@/components/InputBox";
import EditableTextBox from "@/components/EditableTextBox";
import RadioBox from "@/components/RadioBox";
import IconButton from "@/components/IconButton";
import ToolbarBox from "@/components/ToolbarBox";
import TableBox from "@/components/TableBox";
import PaginationBox, { numberOfRow } from "@/components/PaginationBox";
import Spacer from "@/components/Spacer";

import SubcategoryModal from "./SubcategoryModal";
import DeleteModal from "./DeleteModal";

const categories = [
  {
    id: 1,
    name: "Company",
    subcategories: 5,
    status: true,
  },
  {
    id: 2,
    name: "Person",
    subcategories: 10,
    status: true,
  },
];

const Category = () => {
  const { id: categoryId } = useParams();

  const [linkList, setLinkList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(200);
  const [dataAry, setDataAry] = useState([
    {
      id: 1,
      name: "E-mail",
      status: true,
    },
    {
      id: 2,
      name: "Conversation",
      status: true,
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
      label: "Subcategory",
      isSortable: true,
      sort: "",
    },
    {
      key: "status",
      label: "Status",
      isSortable: true,
      width: "100",
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
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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

  const handleChangeStatus = (id, status) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          status: status,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleOpenDeleteModal = (subcategory) => {
    setOpenDeleteModal(true);
    setSelectedSubcategory(subcategory);
  };

  useEffect(() => {
    const category = categories.find((category) => category.id === +categoryId);
    const updatedLinkList = [
      { to: "/", label: "Home" },
      { to: "/categories", label: "Categories" },
      {
        to: `/categories/${categoryId}`,
        label: category.name,
      },
    ];
    setLinkList(updatedLinkList);

    const updatedTableData = dataAry.map((data, index) => {
      return {
        ...data,
        index: index + 1,
        isEdit: false,
        name: data.isEdit ? (
          <InputBox
            type='text'
            id={`category${data.id}`}
            name={`category-${data.id}`}
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
        status: (
          <ElementGroup>
            <RadioBox
              checked={data.status}
              onChange={() => handleChangeStatus(data.id, true)}
            >
              Enable
            </RadioBox>
            <RadioBox
              checked={!data.status}
              onChange={() => handleChangeStatus(data.id, false)}
            >
              Disable
            </RadioBox>
          </ElementGroup>
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
            <IconButton
              rounded={true}
              onClick={() => setOpenSubcategoryModal(true)}
            >
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

      <SubcategoryModal
        openModal={openSubcategoryModal}
        onClose={() => setOpenSubcategoryModal(false)}
        onSubmit={() => setOpenSubcategoryModal(false)}
      />

      <DeleteModal
        deleteMode={true}
        openModal={openDeleteModal}
        selectedSubcategory={selectedSubcategory}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default Category;
