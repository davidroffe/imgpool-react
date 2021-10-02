import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  h1 {
    @media (max-width: @mobile) {
      margin: 0 0 35px;
      font-size: 5rem;
    }
  }
  p {
    margin: 10px 0;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2rem;

    span {
      padding: 2px 0;
      background-color: rgba(0, 0, 0, 0.6);
      line-height: 2rem;
    }
  }
`;

const About = () => {
  return (
    <StyledSection className="container">
      <h1>
        <span>About</span>
      </h1>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </p>
    </StyledSection>
  );
};

export default About;
