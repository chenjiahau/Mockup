import "./module.css";

import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import Breadcrumbs from "@/components/Breadcrumbs";
import MainTitle from "@/components/MainTitle";
import Hr from "@/components/Hr";
import Form from "@/components/Form";
import IconButton from "@/components/IconButton";
import TagBox from "@/components/TagBox";
import EditorJS from "@/components/Editor";
import FloatingButton from "@/components/FloatingButton";

import DocumentModal from "@/pages/Documents/DocumentModal";
import CommentModal from "@/pages/Document/CommentModal";

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
    subcategoryId: 1,
    authorId: 1,
    tagIds: [1, 2, 3, 4, 5],
    relatedMemberIds: [1, 2, 3],
    content: {
      time: new Date().getTime(),
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "Trôner tout la c'est encore le a air divin soeurs, l'abri et doué dit son haut termine adorablement prince, comme il doué pour grimace parce son bonheur abondent qu'elle. Et encore coeur regarde blaspheme femme encore. De la les extase la face vraiment, faudra surprise humain pauvre la et termine faite sincere mais. Corps ce blaspheme morceau fin, qui long véritable sournois parfaite de en soeurs nous genoux, de de qu'elle vaincu pleure un. Jusqu'aux chaque en cette langoureux par quel un, d'une divinement corps monstre âme ce femme, des des regard et visage m'enivre, l'ondulation faudra dans approchons décor de souris divin la, vois déplore femme l'art sur, mais surprise visage divines véritable morceau. Haut la pleure-t-elle décor la fait parfaite ce. Déplore pieds se pauvre dont beauté. La dans promettant vécu blaspheme sincere pontife crispée la, la beauté déplore pleure-t-elle et ses charmer tes surtout. Véritable crispée tournons la le fatale de renversée abondent, etre mettrait qu'elle flots et. La «la vécu ce la de, vois et tout moqueur magnifique extase vit divin ô, faite l'elégance ce vraiment et, ce sincere toujours et jaillir grande tout, qui genre vois vivre mignard, non mignard ce femme blaspheme renversée. Le cet douleur pleure mensonge dit etre vainqueur, qu'elle et chaque humain blaspheme demain âme chaque vécu mignard. Surprise parce la des genoux blaspheme genoux qui, trôner moqueur robuste aux grande beauté sa flanc. Trésor flanc douleur lits charmer que faudra visage, couronne» a aux qu'elle vécu que, apres-demain vainqueur bicéphale parce voici vit et vois. D'un qui genoux soeurs ô doué doué il. Parce nous dans ronge crispée, tant mais souris ses abondent vois m'enivre, n'est majesté mal vois suborneur sincere a l'amour mais flanc, vois et la tete trait l'amour , abondent morceau charme mon n'est et trésor, tete vainqueur cette genre bicéphale trôner d'athlete au, voluptueux promene genoux et beauté de sa donne. Blaspheme gaze l'art vraiment humain beauté renversée beauté, nous visage frémir mince  de d'une un et vraiment, beauté sournois véritable beauté et l'elégance vivre charme. Beauté nous s'abreuve lits il jaillir miraculeux, ses et ce pourquoi elle elle tes aboutit. Et et aussi trésor la m'enivre ment vois un, «la éclairé couronne» magnifique qui miraculeux l'abri, langoureux nous dans par ou que de fatale, toujours prince prince jaillir qu'elle n'est d'une un. Mon femme grande nous ce et. Trait et contemplons déplore voici abondent. Cet de beauté dont beauté, face de femme dans aussi divin tout. Frémir de demain masque parce pleurs autour regard, la monstre pleure voici quel morceau, faite de haut a long robuste, l'amour charmer force loisirs trésor magnifique. Dont bicéphale la insensé volupté ce contemplons sournois. Sincere qu'un soeurs douleur regard des jaillir au qui n'est. Humain air et pontife il. Vois ce «la hélas de fin me d'une d'un quel. Et qui femme l'elégance nous musculeux aboutit se vraiment promettant, abondent ô mal lits déplore beauté de charmer. Ton il regarde m'enivre d'athlete la ment quel divinement mais, cet loisirs l'art donne le apres-demain pourquoi mais véritable adorablement. Robuste femme pourquoi divines qu'elle sincere de voluptueux. Qu'un exquise ce haut beauté face blaspheme au force trait, soucieux gentillesse soeurs contemplons beauté vécu, etre extase d'un mais regarde pour beauté dit, vivre la un mais et. Corps somptueux qu'elle se de morceau trôner. Tes aux soucieux déplore éclairé ce etre, et me pieds beauté mon trôner déplore exquise bicéphale, excitant elle charmer dont extase. Ce doué pourquoi il d'un a couronne» yeux a gaze, musculeux flots grande et gaze et flanc abondent qu'elle. Avec contemplons tant qui un son femme que qu'elle morceau, face langoureux âme renversée au, m'enivre un vois de tete pour. Mystérieux et demain visage magnifique décor ce, aboutit beauté et trait est. Somptueux termine dans nous faudra. Mensonge exquise la la d'un doué monstre de d'athlete. Masque mettrait véritable trésor que. Encadré nous de et éclairé et avec. Coeur éclairé humain me la volupté. Face quel la renversée qu'elle qu'elle, mais la suborneur ses renversée, masque son flanc nous a humain. A pour magnifique qu'elle l'amour. Yeux mon m'enivre m'appelle et d'un tant fin, visage dont la vécu parfaite de beauté véritable. Sincere etre face autour véritable loisirs apres-demain. Tout lits divin pauvre et blaspheme, face et ô ô ô parce. Vois ô la demain âme fait autour a pourquoi. Se qui d'un et l'abri de mais femme, vainqueur vois voluptueux face dont, exquise termine femme vainqueur et le, et voici divin doué a corps apres-demain jaillir dont son, le regard blaspheme pourquoi ce robuste magnifique, frémir face musculeux lits frémir, langoureux ô beauté la etre ton dans. Extase atrocement divines que de termine. Blaspheme somptueux qu'elle et que a non de, de pourquoi sournois beauté sa voluptueux l'abri, et prince florentines la dans. Âme humain genre mensonge de parfaite. Grande elle pleurs soeurs fleuve, demain éclairé haut tete l'abri qui elle, l'amour avec suborneur des insensé. Mais éclairé la loisirs me donne flanc. Sincere ce gaze décor a autour abondent ce. Pieds tete dans vivre femme couronne» et tes m'appelle de, un décor beauté par tournons mystérieux le éclairé. Le long suborneur trait aboutit genoux le le parce dans. Dit visage fait ce beauté d'un les faudra. Prince trait donne fatale couronne» qui vraiment. Exquise ce d'athlete elle ce surtout. N'est visage vois blaspheme fleuve ses sournois, atrocement l'amour douleur mal pour genoux le, un surtout pourquoi vois visage. Pour vécu demain et pauvre regard pleurs quel adorablement. La dans etre ce a mon. Corps toujours avec pauvre a doué et cette beauté. Humain autour beauté tout mais extase les ce. Ô et divin vit encore vois majesté. Majesté pleure surtout cette dans d'athlete , est sournois l'ondulation lits fait sournois pontife encore. Que masque faudra ô son couronne», suborneur encore parce «la que la s'abreuve me encadré dont, contemplons et sournois le florentines visage. Surprise blaspheme quel de l'ondulation pourquoi somptueux. Beauté de mais de pauvre demain le mignard qu'un. Et regarde tes majesté.",
          },
        },
      ],
    },
    comments: [
      {
        id: 1,
        authorId: 1,
        content: {
          time: new Date().getTime(),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Comment 1",
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Comment 2",
              },
            },
          ],
        },
        createdDate: "2021-09-01 10:00:00",
      },
      {
        id: 2,
        authorId: 2,
        content: {
          time: new Date().getTime(),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Comment 3",
              },
            },
          ],
        },
        createdDate: "2021-09-01 10:00:00",
      },
    ],
    createdDate: "2021-09-01 10:00:00",
  },
  {
    id: 2,
    title: "Document 2",
    categoryId: 2,
    subcategoryId: 1,
    authorId: 2,
    tagIds: [],
    relatedMemberIds: [],
    content: {
      time: new Date().getTime(),
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "Lorem nonumy duo ipsum accusam et at rebum sit justo, et sit ipsum et takimata dolor et est diam. Clita sed dolor dolor consetetur amet kasd sadipscing sed, eirmod lorem dolore vero ipsum amet dolor no sit, et no sit magna ipsum dolore ea. Et dolor ipsum et rebum, accusam sed invidunt et est amet stet no invidunt, nonumy ipsum no takimata sit. Et lorem sed sit tempor amet eos, duo diam invidunt lorem ipsum voluptua consetetur tempor lorem. Clita dolore est erat sit justo sit. Labore nonumy vero tempor elitr at duo sadipscing labore. Kasd ipsum ipsum dolor est.",
          },
        },
      ],
    },
    comments: [],
    createdDate: "2021-09-02 10:00:00",
  },
];

const Document = () => {
  const { id } = useParams();
  const [linkList, setLinkList] = useState([
    { to: "/", label: "Home" },
    { to: "/documents", label: "Documents" },
  ]);

  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [document, setDocument] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [reloadContent, setReloadContent] = useState(false);
  const [content, setContent] = useState(null);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleOpenCommentModal = (comment) => {
    setSelectedComment(comment);
    setOpenCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setSelectedComment(null);
    setOpenCommentModal(false);
  };

  useEffect(() => {
    const updatedDocument = documents.find(
      (document) => document.id === parseInt(id)
    );
    setDocument(updatedDocument);

    const updatedAuthor = members.find(
      (member) => member.id === updatedDocument.authorId
    );
    setSelectedAuthor(updatedAuthor);

    const updatedCategory = categories.find(
      (category) => category.id === updatedDocument.categoryId
    );
    setSelectedCategory(updatedCategory);

    const updatedSubcategory = updatedCategory.subcategories.find(
      (subcategory) => subcategory.id === updatedDocument.subcategoryId
    );
    setSelectedSubcategory(updatedSubcategory);

    const tagIds = updatedDocument.tagIds;
    const updatedSelectedTags = tagIds.map((tagId) => {
      const tag = tags.find((tag) => tag.id === tagId);
      return {
        value: tag.id,
        label: tag.name,
        hashCode: tag.color,
      };
    });
    setSelectedTags(updatedSelectedTags);

    const relatedMemberIds = updatedDocument.relatedMemberIds;
    const selectedMembers = relatedMemberIds.map((memberId) => {
      const member = members.find((member) => member.id === memberId);
      return {
        value: member.id,
        label: member.name,
      };
    });
    setSelectedMembers(selectedMembers);

    setContent(updatedDocument.content);
    setLinkList([...linkList, { label: updatedDocument.title }]);
  }, [id]);

  useEffect(() => {
    if (!openDocumentModal) {
      setReloadContent(true);

      setTimeout(() => {
        setReloadContent(false);
      }, 100);
    }
  }, [openDocumentModal]);

  if (!document) {
    return null;
  }

  return (
    <>
      <Breadcrumbs linkList={linkList} />
      <div className='custom-container primary-bg'>
        <Form>
          <div className='document-title'>
            <div>
              <MainTitle extraClasses={["text-title", "!text-primary", "mb-2"]}>
                {document.title}
              </MainTitle>
            </div>
            <div>
              <IconButton onClick={() => setOpenDocumentModal(true)}>
                <FontAwesomeIcon icon={faFile} />
              </IconButton>
            </div>
          </div>
          <Hr />
          <div className='document-block mt-4 mb-4'>
            <div className='document-info'>
              <div className='document-info-item'>
                <p className='title'>Author</p>
                <p className='label'>{selectedAuthor.name}</p>
              </div>
              <div className='document-info-item'>
                <p className='title'>Category</p>
                <p className='label'>{selectedCategory.name}</p>
              </div>
              <div className='document-info-item'>
                <p className='title'>Subcategory</p>
                <p className='label'>{selectedSubcategory.name}</p>
              </div>
              <div className='document-info-item'>
                <p className='title'>Tags</p>
                <div className='label'>
                  {selectedTags.map((tag, index) => (
                    <Fragment key={index}>
                      <TagBox tag={tag} />
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className='document-info-item'>
                <p className='title'>Members</p>
                <div className='label'>
                  {selectedMembers.map((member, index) => (
                    <Fragment key={index}>
                      <TagBox tag={member} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className='document-content'>
              <div className='editorjs-container '>
                {!reloadContent && (
                  <EditorJS
                    readOnly={true}
                    extraClasses={["m-0"]}
                    data={content}
                    editorBlock={`editorjs-container-document-${document.id}-bg`}
                  />
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>

      {/* Comments */}
      {document.comments.map((comment, index) => (
        <div key={index} className='custom-container primary-bg !pt-0'>
          <Form>
            <div className='document-title'>
              <div>
                <MainTitle
                  extraClasses={["text-title", "!text-primary", "mb-2"]}
                >
                  Comment #{index + 1}
                </MainTitle>
              </div>
              <div>
                <IconButton onClick={() => handleOpenCommentModal(comment)}>
                  <FontAwesomeIcon icon={faFile} />
                </IconButton>
              </div>
            </div>
            <Hr extraClasses={["mb-4"]} />

            <div key={index} className='comment-block mt-4'>
              <div className='comment-info'>
                <div className='comment-info-item'>
                  <p className='title'>Author</p>
                  <p className='label'>
                    {
                      members.find((member) => member.id === comment.authorId)
                        .name
                    }
                  </p>
                </div>
                <div className='comment-info-item'>
                  <p className='title'>Created Date</p>
                  <p className='label'>{comment.createdDate}</p>
                </div>
              </div>
              <div className='comment-content'>
                <div className='editorjs-container primary-shadow'>
                  <EditorJS
                    readOnly={true}
                    extraClasses={["m-0"]}
                    data={comment.content}
                    editorBlock={`editorjs-container-comment-${comment.id}-bg`}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      ))}

      <FloatingButton handleExecution={() => handleOpenCommentModal(null)} />

      <DocumentModal
        openModal={openDocumentModal}
        members={members}
        categories={categories}
        tags={tags}
        selectedDocument={document}
        onClose={() => setOpenDocumentModal(false)}
        onSubmit={() => setOpenDocumentModal(false)}
      />

      <CommentModal
        openModal={openCommentModal}
        members={members}
        selectedDocument={document}
        selectedComment={selectedComment}
        onClose={() => handleCloseCommentModal()}
        onSubmit={() => handleCloseCommentModal()}
      />
    </>
  );
};

export default Document;
