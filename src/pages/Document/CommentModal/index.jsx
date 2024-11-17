import "@/pages/Documents/DocumentModal/module.css";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import DropdownBox from "@/components/DropdownBox";
import InputBox from "@/components/InputBox";
import TagBox from "@/components/TagBox";
import EditorJS from "@/components/Editor";

import { getDefaultEditorData } from "@/util/editor.util";

const CommentModal = ({
  openModal,
  members,
  selectedDocument,
  selectedComment,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [authorOptions, setAuthorOptions] = useState([]);
  const [content, setContent] = useState(getDefaultEditorData());
  const [viewMode, setViewMode] = useState(false);
  const [reloadEditor, setReloadEditor] = useState(false);

  const handleChangeAuthor = (author) => {
    const updatedOptions = authorOptions.map((authorOption) => ({
      ...authorOption,
      active: authorOption.value === author.value,
    }));
    setAuthorOptions(updatedOptions);
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

    if (selectedComment?.authorId) {
      const selectedAuthor = authorOptions.find(
        (author) => author.value === selectedComment.authorId
      );
      selectedAuthor.active = true;
    }

    setAuthorOptions(authorOptions);

    // Content
    if (selectedComment?.content) {
      setReloadEditor(true);
      setContent(selectedComment.content);

      setTimeout(() => {
        setReloadEditor(false);
      }, 1000);
    } else {
      setContent(getDefaultEditorData());
    }
  }, [members, selectedDocument, selectedComment]);

  if (!openModal) {
    return null;
  }

  let editorBlockId = "editorjs-container";
  if (selectedDocument) {
    editorBlockId = `editorjs-container-comment-${selectedDocument.id}-edit`;
  }

  return (
    <ModalBox
      enableScroll={true}
      title={selectedComment ? "Edit Comment" : "Add Comment"}
      customWidthClass='document-modal-body'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormLabel forName='name'>Title</FormLabel>
        <InputBox
          disabled={true}
          type='text'
          id='ttile'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(value) => setTitle(value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Author</FormLabel>
        <DropdownBox
          options={authorOptions}
          onClick={(author) => handleChangeAuthor(author)}
          zIndex={2}
        />
      </FormGroup>
      <FormGroup>
        <div className='w-32'>
          <TagBox
            tag={{
              label: viewMode ? "Edit Mode" : "View Mode",
            }}
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

CommentModal.propTypes = {
  openModal: PropTypes.bool,
  members: PropTypes.array,
  selectedDocument: PropTypes.object,
  selectedComment: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CommentModal;
