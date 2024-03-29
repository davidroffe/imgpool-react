import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Modal from '../Utility/Modal';
import BorderButton from "../Utility/BorderButton";

const TagForm = props => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = selectedTags => {
    setSelectedTags(selectedTags);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const tagIds = selectedTags.map(tag => {
      return tag.id;
    });
    const url =
      e.target.id === 'toggle-state' ? '/api/tag/toggle' : 'api/tag/delete';

    props.handleSubmit(url, tagIds);
    setSelectedTags([]);
  };

  return (
    <Modal show={props.show} toggleModal={() => props.toggleShow(!props.show)}>
      <form id="admin-manage-form" className="form-light">
        <div className="field-container">
          <Select
            id="admin-manage-select"
            classNamePrefix="admin-manage-select"
            isMulti
            closeMenuOnSelect={false}
            options={props.tags.map(tag => {
              return {
                value: tag.name,
                label: `${tag.name} ${tag.active ? '' : '(Disabled)'}`,
                id: tag.id
              };
            })}
            onChange={handleChange}
          />
        </div>
        <BorderButton
          id="toggle-state"
          onClick={handleSubmit}
        >
          Toggle State
        </BorderButton>
        <BorderButton
          id="delete"
          color="red"
          onClick={handleSubmit}
        >
          Delete
        </BorderButton>
      </form>
    </Modal>
  );
};

TagForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired
};

export default TagForm;
