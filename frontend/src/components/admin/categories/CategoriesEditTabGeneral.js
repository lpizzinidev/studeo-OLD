import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { createCategory, updateCategory } from "../../../api/server";

import { GetCategory } from "../../../controllers/CategoriesController";

import TextInput from "../../views/TextInput";

const CategoriesEditTabGeneral = () => {
  let initialFormData = {
    name: "",
    description: "",
  };

  const history = useHistory();

  // Check if editing mode
  const { _id } = useParams();

  let isLoading = false;

  if (_id) {
    // Editing
    const { loading, category } = GetCategory(_id);

    isLoading = loading;

    if (!loading) {
      initialFormData = { ...category };
    }
  }

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (_id) {
      updateCategory(_id, formData);
    } else {
      createCategory(formData);
    }

    history.goBack();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return "Loading category...";
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          title="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          title="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input type="submit" className="button" value="SAVE" />
      </form>
    </div>
  );
};

export default CategoriesEditTabGeneral;