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
import ElementGroup from "@/components/ElementGroup";
import InputBox from "@/components/InputBox";
import EditableTextBox from "@/components/EditableTextBox";
import RadioBox from "@/components/RadioBox";
import IconButton from "@/components/IconButton";
import ToolbarBox from "@/components/ToolbarBox";
import TableBox from "@/components/TableBox";
import PaginationBox, { numberOfRow } from "@/components/PaginationBox";
import TagBox from "@/components/TagBox";
import Spacer from "@/components/Spacer";

import RoleModal from "./RoleModal";
import DeleteModal from "./DeleteModal";

const roles = [
  { id: 1, label: "Manager(MGR)" },
  { id: 2, label: "Research and Design(RD)" },
  { id: 3, label: "Developer(DEV)" },
  { id: 4, label: "Quality Assurance(QA)" },
  { id: 5, label: "Operation(OP)" },
  { id: 6, label: "Human Resource(HR)" },
];

const Members = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/members", label: "Members" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(200);
  const [dataAry, setDataAry] = useState([
    {
      id: 1,
      member: "Admin",
      originalMember: "Admin",
      roleId: 1,
      status: true,
    },
    {
      id: 2,
      member: "RD",
      originalMember: "RD",
      roleId: 2,
      status: false,
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
      key: "member",
      label: "Member",
      isSortable: true,
      sort: "",
    },
    {
      key: "role",
      label: "Role",
      isSortable: true,
      isCenter: true,
      width: "220",
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
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleChangeHeader = (newHeader, column, order) => {
    setTableHeader(newHeader);
    const updatedData = orderBy(dataAry, [column], [order]);
    setDataAry(updatedData);
  };

  const handleEditMember = (id) => {
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

  const handleChangeMember = (id, member) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          member: member,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleSaveMember = (id) => {
    const updatedData = dataAry.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          isEdit: false,
          originalMember: data.member,
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
          member: data.originalMember,
        };
      }

      return data;
    });

    setDataAry(updatedData);
  };

  const handleOpenRoleModal = (member) => {
    setOpenRoleModal(true);
    setSelectedMember(member);
  };

  const handleUpdateMember = () => {
    setOpenRoleModal(false);
    setSelectedMember(null);
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

  const handleOpenDeleteModal = (member) => {
    setOpenDeleteModal(true);
    setSelectedMember(member);
  };

  useEffect(() => {
    const updatedTableData = dataAry.map((data, index) => {
      const role = roles.find((role) => role.id === data.roleId);

      return {
        ...data,
        index: index + 1,
        isEdit: false,
        member: data.isEdit ? (
          <InputBox
            type='text'
            id={`member${data.id}`}
            name={`member-${data.id}`}
            value={data.member}
            onChange={(value) => handleChangeMember(data.id, value)}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              onClick={() => handleSaveMember(data.id)}
            />
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleCancelEdit(data.id)}
            />
          </InputBox>
        ) : (
          <EditableTextBox
            text={data.member}
            onClick={() => {
              handleEditMember(data.id);
            }}
          />
        ),
        role: (
          <TagBox
            tag={{ label: role.label }}
            onClick={() => handleOpenRoleModal(data)}
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
            <IconButton rounded={true} onClick={() => setOpenRoleModal(true)}>
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

      <RoleModal
        openModal={openRoleModal}
        selectedMember={selectedMember}
        roles={roles}
        onClose={() => handleUpdateMember()}
        onSubmit={() => handleUpdateMember()}
      />

      <DeleteModal
        deleteMode={true}
        openModal={openDeleteModal}
        selectedMember={selectedMember}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default Members;
