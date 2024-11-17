import "./module.css";

import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import DropdownBox from "@/components/DropdownBox";
import InputBox from "@/components/InputBox";
import TagBox from "@/components/TagBox";
import EditorJS from "@/components/Editor";

import { getDefaultEditorData } from "@/util/editor.util";

const DocumentModal = ({
  openModal,
  members,
  categories,
  tags,
  selectedDocument,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [content, setContent] = useState(getDefaultEditorData());
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [reloadEditor, setReloadEditor] = useState(false);

  const handleChangeAuthor = (author) => {
    const updatedOptions = authorOptions.map((authorOption) => ({
      ...authorOption,
      active: authorOption.value === author.value,
    }));
    setAuthorOptions(updatedOptions);
  };

  const handleChangeCategory = (category) => {
    const updatedOptions = categoryOptions.map((categoryOption) => ({
      ...categoryOption,
      active: categoryOption.value === category.value,
    }));
    setCategoryOptions(updatedOptions);

    const subcategory = categories.find(
      (c) => c.id === category.value
    ).subcategories;

    const updatedSubcategoryOptions = subcategory.map((subcategory, index) => ({
      value: subcategory.id,
      label: subcategory.name,
      active: index === 0,
    }));

    setSubcategoryOptions(updatedSubcategoryOptions);
  };

  const handleChangeSubcategory = (subcategory) => {
    const updatedOptions = subcategoryOptions.map((subcategoryOption) => ({
      ...subcategoryOption,
      active: subcategoryOption.value === subcategory.value,
    }));

    setSubcategoryOptions(updatedOptions);
  };

  const handleClickTag = (tag) => {
    const updatedSelectedTags = [
      ...selectedTags,
      {
        value: tag.value,
        label: tag.label,
        hashCode: tag.hashCode,
      },
    ];
    setSelectedTags(updatedSelectedTags);

    const selectedTagIds = updatedSelectedTags.map((tag) => tag.value);
    const updatedOptions = [];
    tags.forEach((tag) => {
      if (!selectedTagIds.includes(tag.id)) {
        updatedOptions.push({
          value: tag.id,
          label: tag.name,
          hashCode: tag.color,
          active: false,
        });
      }
    });
    setTagOptions(updatedOptions);
  };

  const handleDeleteTag = (tag) => {
    const updatedSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag.value !== tag.value
    );
    setSelectedTags(updatedSelectedTags);

    const updatedOptions = tagOptions;
    updatedOptions.push(tag);
    setTagOptions(updatedOptions);
  };

  const handleClickMember = (member) => {
    const updatedSelectedMembers = [
      ...selectedMembers,
      {
        value: member.value,
        label: member.label,
      },
    ];
    setSelectedMembers(updatedSelectedMembers);

    const selectedMemberIds = updatedSelectedMembers.map(
      (member) => member.value
    );
    const updatedOptions = [];
    members.forEach((member) => {
      if (!selectedMemberIds.includes(member.id)) {
        updatedOptions.push({
          value: member.id,
          label: member.name,
          active: false,
        });
      }
    });
    setMemberOptions(updatedOptions);
  };

  const handleDeleteMember = (member) => {
    const updatedSelectedMembers = selectedMembers.filter(
      (selectedMember) => selectedMember.value !== member.value
    );
    setSelectedMembers(updatedSelectedMembers);

    const updatedOptions = memberOptions;
    updatedOptions.push(member);
    setMemberOptions(updatedOptions);
  };

  const changeViewMode = () => {
    setViewMode(!viewMode);
    setReloadEditor(true);

    setTimeout(() => {
      setReloadEditor(false);
    }, 100);
  };

  useEffect(() => {
    // Title
    if (selectedDocument?.title) {
      setTitle(selectedDocument.title);
    }

    // Author options
    const authorOptions = members.map((member) => ({
      value: member.id,
      label: member.name,
      active: false,
    }));

    if (selectedDocument?.authorId) {
      const selectedAuthor = authorOptions.find(
        (author) => author.value === selectedDocument.authorId
      );
      selectedAuthor.active = true;
    }

    setAuthorOptions(authorOptions);

    // Category options
    const categoryOptions = categories.map((category, index) => ({
      value: category.id,
      label: category.name,
      active: index === 0,
    }));

    if (selectedDocument?.categoryId) {
      const selectedCategory = categoryOptions.find(
        (category) => category.value === selectedDocument.categoryId
      );
      selectedCategory.active = true;
    }

    setCategoryOptions(categoryOptions);

    // Subcategory options
    const subcategoryOptions = categories[0].subcategories.map(
      (subcategory, index) => ({
        value: subcategory.id,
        label: subcategory.name,
        active: index === 0,
      })
    );

    if (selectedDocument?.subcategoryId) {
      const selectedSubcategory = subcategoryOptions.find(
        (subcategory) => subcategory.value === selectedDocument.subcategoryId
      );
      selectedSubcategory.active = true;
    }

    setSubcategoryOptions(subcategoryOptions);

    // Tag options
    if (selectedDocument?.tagIds) {
      const selectedTags = selectedDocument.tagIds.map((tag) => {
        const selectedTag = tags.find((t) => t.id === tag);
        return {
          value: selectedTag.id,
          label: selectedTag.name,
          hashCode: selectedTag.color,
        };
      });
      setSelectedTags(selectedTags);

      const tagOptions = tags
        .map((tag) => {
          if (
            selectedTags.find((selectedTag) => selectedTag.value === tag.id)
          ) {
            return null;
          }

          return {
            value: tag.id,
            label: tag.name,
            hashCode: tag.color,
            active: false,
          };
        })
        .filter((tag) => tag !== null);
      setTagOptions(tagOptions);
    } else {
      const tagOptions = tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
        hashCode: tag.color,
        active: false,
      }));

      setTagOptions(tagOptions);
      setSelectedTags([]);
    }

    // Member options
    if (selectedDocument?.relatedMemberIds) {
      const selectedMembers = selectedDocument.relatedMemberIds.map(
        (member) => {
          const selectedMember = members.find((m) => m.id === member);
          return {
            value: selectedMember.id,
            label: selectedMember.name,
          };
        }
      );

      setSelectedMembers(selectedMembers);

      const memberOptions = members
        .map((member) => {
          if (
            selectedMembers.find(
              (selectedMember) => selectedMember.value === member.id
            )
          ) {
            return null;
          }

          return {
            value: member.id,
            label: member.name,
            active: false,
          };
        })
        .filter((member) => member !== null);

      setMemberOptions(memberOptions);
    } else {
      const memberOptions = members.map((member) => ({
        value: member.id,
        label: member.name,
        active: false,
      }));

      setMemberOptions(memberOptions);
      setSelectedMembers([]);
    }

    // Content
    if (selectedDocument?.content) {
      setReloadEditor(true);
      setContent(selectedDocument.content);

      setTimeout(() => {
        setReloadEditor(false);
      }, 1000);
    }
  }, [categories, members, tags]);

  if (!openModal) {
    return null;
  }

  let editorBlockId = "editorjs-container";
  if (selectedDocument) {
    editorBlockId = `editorjs-container-document-${selectedDocument.id}-edit`;
  }

  return (
    <ModalBox
      enableScroll={true}
      title={selectedDocument ? "Edit Document" : "Add Document"}
      customWidthClass='document-modal-body'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormLabel forName='name'>Title</FormLabel>
        <InputBox
          type='text'
          id='ttile'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(value) => setTitle(value)}
        />
      </FormGroup>
      <FormGroup>
        <div className='flex justify-end'>
          <TagBox
            tag={{
              label: hiddenInfo ? "Show Info" : "Hide Info",
              hashCode: hiddenInfo ? "#5bbcff" : "#054673",
            }}
            extraClasses={["!h-6"]}
            onClick={() => setHiddenInfo(!hiddenInfo)}
          />
        </div>
      </FormGroup>
      {!hiddenInfo && (
        <div className='mb-6'>
          <FormGroup>
            <FormLabel forName='name'>Author</FormLabel>
            <DropdownBox
              options={authorOptions}
              onClick={(author) => handleChangeAuthor(author)}
              zIndex={1}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel forName='name'>Category</FormLabel>
            <DropdownBox
              options={categoryOptions}
              onClick={(category) => handleChangeCategory(category)}
              zIndex={2}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel forName='name'>Subcategory</FormLabel>
            <DropdownBox
              options={subcategoryOptions}
              onClick={(subcategory) => handleChangeSubcategory(subcategory)}
              zIndex={3}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel forName='name'>Tags</FormLabel>
            <DropdownBox
              options={tagOptions}
              isColor={true}
              onClick={(tag) => handleClickTag(tag)}
              zIndex={4}
            />
          </FormGroup>
          {selectedTags.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-6'>
              {selectedTags.map((tag, index) => (
                <Fragment key={index}>
                  <TagBox
                    isDelBtn={true}
                    tag={tag}
                    onClick={(tag) => handleDeleteTag(tag)}
                  />
                </Fragment>
              ))}
            </div>
          )}
          <FormGroup extraClasses={["!mb-0"]}>
            <FormLabel forName='name'>Related Members</FormLabel>
            <DropdownBox
              options={memberOptions}
              onClick={(member) => handleClickMember(member)}
              zIndex={5}
            />
          </FormGroup>
          {selectedMembers.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-6'>
              {selectedMembers.map((member, index) => (
                <Fragment key={index}>
                  <TagBox
                    isDelBtn={true}
                    tag={member}
                    onClick={handleDeleteMember}
                  />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      <FormGroup>
        <div className='flex justify-end'>
          <TagBox
            tag={{
              label: viewMode ? "Edit Mode" : "View Mode",
              hashCode: viewMode ? "#5bbcff" : "#054673",
            }}
            extraClasses={["!h-6"]}
            onClick={() => changeViewMode()}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <div className='editorjs-container primary-shadow'>
          {!reloadEditor && (
            <EditorJS
              reload={reloadEditor}
              readOnly={viewMode}
              data={content}
              onChange={(data) => setContent(data)}
              editorBlock={editorBlockId}
            />
          )}
        </div>
      </FormGroup>
    </ModalBox>
  );
};

DocumentModal.propTypes = {
  openModal: PropTypes.bool,
  members: PropTypes.array,
  categories: PropTypes.array,
  tags: PropTypes.array,
  selectedDocument: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DocumentModal;
