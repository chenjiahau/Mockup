import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faPlus,
  faPenToSquare,
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
import Tooltip from "@/components/Tooltip";

import CategoryModal from "./CategoryModal";
import DeleteModal from "./DeleteModal";

const Categories = () => {
  const navigate = useNavigate();
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(200);
  const [dataAry, setDataAry] = useState([
    {
      id: 1,
      name: "Company",
      subcategories: (
        <Tooltip
          content={
            <ul>
              <li>Subcategory 1</li>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
              <li>Subcategory 4</li>
              <li>Subcategory 5</li>
              <li>Subcategory 6</li>
              <li>Subcategory 7</li>
              <li>Subcategory 8</li>
              <li>Subcategory 9</li>
              <li>Subcategory 10</li>
            </ul>
          }
        >
          100
        </Tooltip>
      ),
      status: true,
    },
    {
      id: 2,
      name: "Person",
      subcategories: (
        <Tooltip
          content={
            <ul>
              <li>Subcategory 1</li>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
              <li>Subcategory 4</li>
              <li>Subcategory 5</li>
              <li>Subcategory 6</li>
              <li>Subcategory 7</li>
              <li>Subcategory 8</li>
              <li>Subcategory 9</li>
              <li>Subcategory 10</li>
            </ul>
          }
        >
          10
        </Tooltip>
      ),
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
      label: "Category",
      isSortable: true,
      sort: "",
    },
    {
      key: "subcategories",
      label: "Subcategories",
      isSortable: true,
      isCenter: true,
      width: "50",
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
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleEditCategory = (category) => {
    navigate(`/categories/${category.id}`);
  };

  const handleOpenDeleteModal = (category) => {
    setOpenDeleteModal(true);
    setSelectedCategory(category);
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
        subcategories: data.subcategories,
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
            <IconButton onClick={() => handleEditCategory(data)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
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
              onClick={() => setOpenCategoryModal(true)}
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

      <CategoryModal
        openModal={openCategoryModal}
        selectedCategory={selectedCategory}
        onClose={() => setOpenCategoryModal(false)}
        onSubmit={() => setOpenCategoryModal(false)}
      />

      <DeleteModal
        deleteMode={true}
        openModal={openDeleteModal}
        selectedCategory={selectedCategory}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default Categories;
