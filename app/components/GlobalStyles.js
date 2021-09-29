import ReactToastifyCss from 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
${ReactToastifyCss}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

a,
a:link,
a:visited,
a:active,
a:focus,
a:hover {
  text-decoration: none;
  color: #767676;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

html {
  font-size: 10px;
}

::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

* {
  box-sizing: border-box;
  -ms-overflow-style: none;  // IE 10+
  scrollbar-width: none;  // Firefox
}

body {
  color: #333;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: sans-serif;
  font-weight: 600;
}

h1 {
  font-size: 6.5rem;
}

h2 {
  font-size: 2rem;
}

p {
  font-family: sans-serif;
  font-size: 1.2rem;
}


/* React wrapping root element children in div */
html,
body,
#root,
#root > div {
  height: 100%;
}

body {
  font-family: sans-serif;
}
  
  //App Views
  .container {
    max-width: 75%;
    margin: 5% auto 0;
    padding: 60px;
    @media (max-width: 720px) {
      max-width: none;
      margin: 0;
      padding: 45px;
    }
  }
  
  h1 {
    margin: 0 auto 35px;
  
    span {
      padding-right: 15px;
      border-right: 1px solid #333;
    }
  }
  // Google reCAPTCHA
  #recaptcha {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
  }


  input[type='text']:not(.search-field),
  input[type='password'],
  textarea {
    padding: 15px 10px;
    width: 300px;
    display: block;
    border: none;
    border-bottom: 1px solid #333;
    margin: 10px auto;
    font-size: 1.2rem;
    font-family: sans-serif;
    font-weight: 600;
    background: none;
  }
  
  input[type='text']:focus,
  input[type='password']:focus,
  textarea:focus {
    outline: 0;
  }
  
  ::-webkit-input-placeholder {
    opacity: 1;
  }
  
  ::-moz-placeholder {
    /* Firefox 19+ */
    opacity: 1;
  }
  
  ::-ms-input-placeholder {
    opacity: 1;
  }
  
  textarea {
    height: 125px;
  }
  
  input[type='submit'] {
    margin: auto;
  }
  
  .upload-container {
    padding: 15px 10px;
    margin: auto;
    width: 300px;
    border-bottom: 1px solid #333;
  
    button {
      padding: 0;
      border: none;
      outline: none;
      font-size: 1.2rem;
      font-family: sans-serif;
      font-weight: 600;
      cursor: pointer;
    }
  }
  
  .field-container {
    margin-bottom: 35px;
  }
  
  .form-dark {
    input[type='text'],
    input[type='password'] {
      color: #fffef2;
      border-color: #fffef2;
      ::-webkit-input-placeholder {
        color: #ffffff;
        opacity: 1;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        color: #ffffff;
        opacity: 1;
      }
      ::-ms-input-placeholder {
        color: #ffffff;
        opacity: 1;
      }
    }
  
    input[type='submit'] {
      border-color: #fff;
      color: #fffef2;
  
      &:hover {
        background: #fff;
        color: #333;
      }
    }
  }
  
  .form-light {
    input[type='text'],
    input[type='password'] {
      color: #333;
      border-bottom: 1px solid #333;
    }
    ::-webkit-input-placeholder {
      color: #333;
      opacity: 1;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #333;
      opacity: 1;
    }
    ::-ms-input-placeholder {
      color: #333;
      opacity: 1;
    }
  
    input[type='submit'] {
      border-color: #333;
      color: #333;
  
      &:hover {
        background: #333;
        color: #fffef2;
      }
    }
  }
  
  form {
    p {
      margin-bottom: 10px;
      text-align: center;
    }
  }
`;