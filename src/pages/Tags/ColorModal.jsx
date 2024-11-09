import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import DropdownBox from "@/components/DropdownBox";

const colors = [
  {
    categoryId: 1,
    name: "Red",
    colors: [
      { id: 1, name: "Red", color: "#FF0000" },
      { id: 2, name: "Crimson", color: "#DC143C" },
      { id: 3, name: "Dark Red", color: "#8B0000" },
    ],
  },
  {
    categoryId: 2,
    name: "Green",
    colors: [
      { id: 4, name: "Green", color: "#008000" },
      { id: 5, name: "Lime", color: "#00FF00" },
      { id: 6, name: "Dark Green", color: "#006400" },
    ],
  },
  {
    categoryId: 3,
    name: "Blue",
    colors: [
      { id: 7, name: "Blue", color: "#0000FF" },
      { id: 8, name: "Sky Blue", color: "#87CEEB" },
      { id: 9, name: "Dark Blue", color: "#00008B" },
    ],
  },
];

const ColorModal = ({ openModal, selectedTag, onClose, onSubmit }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const handleCategoryChange = (categoryOption) => {
    const updatedCategoryOptions = categoryOptions.map((category) => {
      return {
        ...category,
        active: category.value === categoryOption.value,
      };
    });

    setCategoryOptions(updatedCategoryOptions);

    const selectedCategory = colors.find(
      (category) => category.categoryId === categoryOption.value
    );

    const updatedColorOptions = selectedCategory.colors.map((color) => {
      return {
        value: color.id,
        label: color.name,
        hashCode: color.color,
        active: false,
      };
    });

    if (updatedColorOptions.length > 0) {
      updatedColorOptions[0].active = true;
    }

    setColorOptions(updatedColorOptions);
  };

  const handleColorChange = (colorOption) => {
    const updatedColorOptions = colorOptions.map((color) => {
      return {
        ...color,
        active: color.value === colorOption.value,
      };
    });

    setColorOptions(updatedColorOptions);
  };

  useEffect(() => {
    if (!selectedTag) {
      return;
    }

    const updatedCategoryOptions = colors.map((category) => {
      return {
        value: category.categoryId,
        label: category.name,
        active: category.categoryId === selectedTag.colorDetail.categoryId,
      };
    });
    setCategoryOptions(updatedCategoryOptions);

    const selectedCategory = colors.find(
      (color) => color.categoryId === selectedTag.colorDetail.categoryId
    );

    const updatedColorOptions = selectedCategory.colors.map((color) => {
      return {
        value: color.id,
        label: color.name,
        hashCode: color.color,
        active: color.id === selectedTag.colorDetail.colorId,
      };
    });

    setColorOptions(updatedColorOptions);
  }, [selectedTag]);

  if (!openModal) {
    return null;
  }

  return (
    <ModalBox
      title='Edit Color'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormLabel forName='category'>Category</FormLabel>
        <DropdownBox
          options={categoryOptions}
          onClick={(option) => handleCategoryChange(option)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel forName='color'>Color</FormLabel>
        <DropdownBox
          isColor={true}
          options={colorOptions}
          onClick={(option) => handleColorChange(option)}
        />
      </FormGroup>
    </ModalBox>
  );
};

ColorModal.propTypes = {
  openModal: PropTypes.bool,
  selectedTag: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ColorModal;
