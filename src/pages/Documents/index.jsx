import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { orderBy, set } from "lodash";

import Breadcrumbs from "@/components/Breadcrumbs";
import Form from "@/components/Form";
import LinkButton from "@/components/LinkButton";
import IconButton from "@/components/IconButton";
import ToolbarBox from "@/components/ToolbarBox";
import TableBox from "@/components/TableBox";
import PaginationBox, { numberOfRow } from "@/components/PaginationBox";
import Spacer from "@/components/Spacer";
import FloatingButton from "@/components/FloatingButton";
import SearchInputBox from "@/components/SearchInputBox";
import LoadingBox from "@/components/LoadingBox";

import DocumentModal from "./DocumentModal";
import DeleteModal from "./DeleteModal";

const members = [
  {
    id: 1,
    name: "Author 1",
  },
  {
    id: 2,
    name: "Author 2",
  },
  {
    id: 3,
    name: "Author 3",
  },
];

const categories = [
  {
    id: 1,
    name: "Category 1",
    subcategories: [
      {
        id: 1,
        name: "Subcategory 1-1",
      },
      {
        id: 2,
        name: "Subcategory 1-2",
      },
    ],
  },
  {
    id: 2,
    name: "Category 2",
    subcategories: [
      {
        id: 1,
        name: "Subcategory 2-1",
      },
      {
        id: 2,
        name: "Subcategory 2-2",
      },
    ],
  },
  {
    id: 3,
    name: "Category 3",
    subcategories: [
      {
        id: 1,
        name: "Subcategory 3-1",
      },
      {
        id: 2,
        name: "Subcategory 3-2",
      },
    ],
  },
];

const tags = [
  {
    id: 1,
    name: "Tag 1",
    color: "#FF0000",
  },
  {
    id: 2,
    name: "Tag 2",
    color: "#00FF00",
  },
  {
    id: 3,
    name: "Tag 3",
    color: "#0000FF",
  },
  {
    id: 4,
    name: "Tag 4",
    color: "#FFFF00",
  },
  {
    id: 5,
    name: "Tag 5",
    color: "#FF00FF",
  },
  {
    id: 6,
    name: "Tag 6",
    color: "#00FFFF",
  },
];

const documents = [
  {
    id: 1,
    title: "This is a document, please read it, thank you.",
    categoryId: 1,
    category: "Category 1",
    subcategoryId: 1,
    subcategory: "Subcategory 1-1",
    authorId: 1,
    author: "Author 1",
    tagIds: [1, 2],
    relatedMemberIds: [1, 2],
    createdDate: "2021-09-01 10:00:00",
  },
  {
    id: 2,
    title: "Document 2",
    categoryId: 2,
    category: "Category 2",
    subcategoryId: 1,
    subcategory: "Subcategory 2-1",
    authorId: 2,
    author: "Author 2",
    tagIds: [],
    relatedMemberIds: [],
    createdDate: "2021-09-02 10:00:00",
  },
];

const Documents = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/documents", label: "Documents" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(numberOfRow[1]);
  const [totalDataCount, setTotalDataCount] = useState(200);
  const [dataAry, setDataAry] = useState(documents);
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
      key: "document",
      label: "Document",
      isSortable: true,
      sort: "",
    },
    {
      key: "category",
      label: "Category",
      isSortable: true,
      isCenter: true,
      sort: "",
    },
    {
      key: "subcategory",
      label: "Subcategory",
      isSortable: true,
      isCenter: true,
      sort: "",
    },
    {
      key: "author",
      label: "Author",
      isSortable: true,
      isCenter: true,
      sort: "",
    },
    {
      key: "createdDate",
      label: "Created Date",
      isSortable: true,
      isCenter: true,
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
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (dom) => {
    setLoading(true);
    const value = dom?.target?.value;

    if (value) {
      const updatedData = documents.filter((data) => {
        return data.title.toLowerCase().includes(value.toLowerCase());
      });

      setDataAry(updatedData);
    } else {
      setDataAry(documents);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleChangeHeader = (newHeader, column, order) => {
    setTableHeader(newHeader);
    const updatedData = orderBy(dataAry, [column], [order]);
    setDataAry(updatedData);
  };

  const handleOpenDeleteModal = (document) => {
    setOpenDeleteModal(true);
    setSelectedDocument(document);
  };

  useEffect(() => {
    const updatedTableData = dataAry.map((data, index) => {
      return {
        ...data,
        index: index + 1,
        isEdit: false,
        document: (
          <LinkButton to={`/documents/${data.id}`} title={data.title} />
        ),
        category: data.category,
        subcategory: data.subcategory,
        author: data.author,
        action: (
          <div className='flex items-center gap-4'>
            {/* <IconButton onClick={() => handleOpenDeleteModal(data)}>
              <FontAwesomeIcon icon={faFile} />
            </IconButton> */}
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
            <SearchInputBox
              onChange={(searchText) => handleSearch(searchText)}
            />
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

      <FloatingButton handleExecution={() => setOpenDocumentModal(true)} />

      <DocumentModal
        openModal={openDocumentModal}
        members={members}
        categories={categories}
        tags={tags}
        selectedDocument={selectedDocument}
        onClose={() => setOpenDocumentModal(false)}
        onSubmit={() => setOpenDocumentModal(false)}
      />

      <DeleteModal
        deleteMode={true}
        openModal={openDeleteModal}
        selectedDocument={selectedDocument}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={() => setOpenDeleteModal(false)}
      />

      <LoadingBox visible={loading} />
    </>
  );
};

export default Documents;
