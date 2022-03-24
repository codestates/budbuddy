import React from "react";
import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(1fr, auto);
  grid-template-rows: repeat(3, minmax(1fr, auto));
  flex-direction: column;
  width: 45%;
  height: 40%;

  .cover {
    object-fit: cover;
    width: 100%;
    height: 15vh;
  }
`;

const Album = () => {
  return (
    <Layout>
      <img className="cover" src={`Dummy/diary_${1}.PNG`} alt={`bg`} />
      <div>스투키</div>
      <div>작성날짜:3/23 17시</div>
    </Layout>
  );
};

export default Album;
