export default {
  editForm: (editAccount, email, username) => {
    let newErrorMessage = [];

    if (editAccount.field === 'edit-email') {
      if (editAccount.email === undefined || editAccount.email === '') {
        newErrorMessage.push('Please enter an email.');
      } else if (editAccount.email === email) {
        newErrorMessage.push('Please use a different email.');
      }
    }
    if (editAccount.field === 'edit-username') {
      if (editAccount.username === undefined || editAccount.username === '') {
        newErrorMessage.push('Please enter a username.');
      } else if (editAccount.username === username) {
        newErrorMessage.push('Please use a different username.');
      }
    }
    if (editAccount.field === 'edit-bio') {
      if (editAccount.bio === undefined) {
        newErrorMessage.push('Error with bio.');
      }
    }
    if (editAccount.field === 'edit-password') {
      if (editAccount.password === undefined || editAccount.password === '') {
        newErrorMessage.push('Please enter a password.');
      } else if (editAccount.password.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      } else if (editAccount.passwordConfirm !== editAccount.password) {
        newErrorMessage.push('Passwords do not match.');
      }
    }

    return newErrorMessage;
  },
};
