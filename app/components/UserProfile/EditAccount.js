import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Utility/Modal';
import BorderButton from '../Utility/BorderButton';

const EditAccount = (props) => {
  return (
    <Modal show={props.data.show} toggleModal={props.clearValues}>
      <form id="edit-form" className="form-light" onSubmit={props.handleSubmit}>
        <div className="field-container">
          {props.data.field === 'edit-username' ? (
            <input
              id="username"
              autoComplete={'off'}
              type={'text'}
              title={'Username'}
              name={'username'}
              value={props.data.username}
              placeholder={'USERNAME'}
              onChange={props.handleChange.bind(
                null,
                'editAccount',
                'username'
              )}
            />
          ) : null}
          {props.data.field === 'edit-email' ? (
            <input
              id="email"
              autoComplete={'off'}
              type={'text'}
              title={'Email'}
              name={'email'}
              value={props.data.email}
              placeholder={'EMAIL'}
              onChange={props.handleChange.bind(null, 'editAccount', 'email')}
            />
          ) : null}
          {props.data.field === 'edit-bio' ? (
            <textarea
              id="bio"
              title={'Bio'}
              name={'bio'}
              value={props.data.bio}
              placeholder={'BIO'}
              onChange={props.handleChange.bind(null, 'editAccount', 'bio')}
            />
          ) : null}
        </div>
        <BorderButton type="submit" as="input" />
      </form>
    </Modal>
  );
};

EditAccount.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearValues: PropTypes.func.isRequired,
  data: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    field: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }),
};

export default EditAccount;
