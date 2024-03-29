import React from 'react';
import PropTypes from 'prop-types';
import FileInput from '../Utility/FileInput';
import Modal from '../Utility/Modal';
import BorderButton from "../Utility/BorderButton";

const CreatePost = (props) => {
  return (
    <Modal show={props.data.show} toggleModal={props.clearValues}>
      <form id="post-form" className="form-light" onSubmit={props.handleSubmit}>
        <div className="field-container">
          <FileInput
            id="file"
            title={'Post'}
            name={'post'}
            value={props.data.file.name}
            handleChange={props.handleChange.bind(null, 'createPost', 'file')}
          />
          <input
            id="source"
            autoComplete={'off'}
            type={'text'}
            title={'Source'}
            name={'source'}
            value={props.data.source}
            placeholder={'SOURCE URL'}
            onChange={props.handleChange.bind(null, 'createPost', 'source')}
          />
          <input
            id="tags"
            autoComplete={'off'}
            type={'text'}
            title={'Tags'}
            name={'tags'}
            value={props.data.tags}
            placeholder={'TAGS'}
            onChange={props.handleChange.bind(null, 'createPost', 'tags')}
          />
        </div>
        <BorderButton type="submit" as="input" />
      </form>
    </Modal>
  );
};

CreatePost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearValues: PropTypes.func.isRequired,
  data: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    file: PropTypes.shape({
      value: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
    }),
    source: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default CreatePost;
